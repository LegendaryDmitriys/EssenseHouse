import type React from "react"
import { useEffect, useState, useCallback, useRef } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import config from "@/api/api"

interface Message {
    id?: string | number
    message: string
    is_admin: boolean
    username?: string
    timestamp: string
}

const ChatPage = () => {
    const { questionId } = useParams<{ questionId: string }>()
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
    const { user } = useAuth()
    const isAdmin = user?.isAdmin || false
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${config.API_URL}chat/chat-messages/${questionId}/`)
                if (response.ok) {
                    const data = await response.json()
                    setMessages(data)
                }
            } catch (error) {
                console.error("Ошибка загрузки сообщений:", error)
            }
        }

        if (questionId) {
            fetchMessages()
        }
    }, [questionId])


    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (!questionId) return

        const token = localStorage.getItem("accessToken")
        const socket = new WebSocket(`ws://192.168.0.103:8000/ws/question-chat/${questionId}/?token=${token}`)

        const connectionTimeout = setTimeout(() => {
            if (socket.readyState !== WebSocket.OPEN) {
                socket.close()
                setConnectionStatus("disconnected")
            }
        }, 5000)

        socket.onopen = () => {
            clearTimeout(connectionTimeout)
            setWs(socket)
            setConnectionStatus("connected")
        }

        socket.onmessage = (event) => {

            try {
                const data = JSON.parse(event.data)

                if (data.message) {
                    const newMessage: Message = {
                        id: data.id || Date.now(),
                        message: data.message,
                        is_admin: data.is_admin || false,
                        username: data.username || (data.is_admin ? "Админ" : "Пользователь"),
                        timestamp: data.timestamp || new Date().toISOString(),
                    }


                    setMessages((prevMessages) => {
                        const isDuplicate = prevMessages.some(
                            (msg) =>
                                msg.id === newMessage.id ||
                                (msg.message === newMessage.message &&
                                    Math.abs(new Date(msg.timestamp).getTime() - new Date(newMessage.timestamp).getTime()) < 1000),
                        )

                        if (isDuplicate) {
                            return prevMessages
                        }

                        return [...prevMessages, newMessage]
                    })
                } else {
                    console.warn("Сообщение не содержит поле message:", data)
                }
            } catch (error) {
                console.error("Ошибка парсинга сообщения:", error)
            }
        }

        socket.onclose = (event) => {
            console.log(`WebSocket закрыт. Код: ${event.code}, Причина: ${event.reason}`)
            setConnectionStatus("disconnected")
            setWs(null)

            if (event.code === 1006) {
                console.error("Аномальное закрытие соединения")
            }
        }

        socket.onerror = (error) => {
            console.error("Ошибка WebSocket:", error)
            setConnectionStatus("disconnected")
        }

        return () => {
            clearTimeout(connectionTimeout)
            if (socket.readyState === WebSocket.OPEN) {
                socket.close(1000, "Компонент размонтирован")
            }
        }
    }, [questionId])

    const sendMessage = useCallback(() => {
        if (!inputValue.trim() || !ws) return

        if (ws.readyState === WebSocket.OPEN) {
            const messageData = {
                message: inputValue,
                is_admin: isAdmin,
            }

            ws.send(JSON.stringify(messageData))
            setInputValue("")
        } else {
            alert("Соединение не установлено. Подождите...")
        }
    }, [inputValue, ws, isAdmin])

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const getConnectionStatusColor = () => {
        switch (connectionStatus) {
            case "connected":
                return "text-green-600"
            case "connecting":
                return "text-yellow-600"
            case "disconnected":
                return "text-red-600"
            default:
                return "text-gray-600"
        }
    }

    const getConnectionStatusText = () => {
        switch (connectionStatus) {
            case "connected":
                return "Подключено"
            case "connecting":
                return "Подключение..."
            case "disconnected":
                return "Отключено"
            default:
                return "Неизвестно"
        }
    }

    return (
        <div className="flex flex-col h-screen p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Чат #{questionId}</h2>
                <div className={`text-sm ${getConnectionStatusColor()}`}>Статус: {getConnectionStatusText()}</div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">Нет сообщений. Будьте первым!</div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={msg.id || idx}
                            className={`p-3 rounded-lg max-w-xs ${
                                msg.is_admin ? "bg-blue-100 text-blue-800 ml-auto" : "bg-green-100 text-green-800"
                            }`}
                        >
                            <div className="text-xs opacity-70 mb-1">
                                {msg.username || (msg.is_admin ? "Админ" : "Пользователь")}
                                {msg.timestamp && <span className="ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>}
                            </div>
                            <div className="text-sm">{msg.message}</div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите сообщение..."
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={connectionStatus !== "connected"}
                />
                <button
                    onClick={sendMessage}
                    disabled={connectionStatus !== "connected" || !inputValue.trim()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition-colors"
                >
                    Отправить
                </button>
            </div>

        </div>
    )
}

export default ChatPage