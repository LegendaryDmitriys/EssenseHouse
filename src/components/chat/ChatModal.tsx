import type React from "react"
import { useEffect, useState, useCallback, useRef } from "react"
import { useAuth } from "@/context/AuthContext"
import config from "@/api/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
    id?: string | number
    message: string
    is_admin: boolean
    username?: string
    timestamp: string
}

interface ChatModalProps {
    isOpen: boolean
    onClose: () => void
    questionId: string
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, questionId }) => {
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
        if (messages.length > 0) {
            scrollToBottom()
        }
    }, [messages])

    useEffect(() => {
        if (!isOpen || !questionId) return

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

        fetchMessages()

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
                }
            } catch (error) {
                console.error("Ошибка парсинга сообщения:", error)
            }
        }

        socket.onclose = (event) => {
            console.log(`WebSocket закрыт. Код: ${event.code}, Причина: ${event.reason}`)
            setConnectionStatus("disconnected")
            setWs(null)
        }

        socket.onerror = (error) => {
            console.error("Ошибка WebSocket:", error)
            setConnectionStatus("disconnected")
        }

        return () => {
            clearTimeout(connectionTimeout)
            if (socket.readyState === WebSocket.OPEN) {
                socket.close(1000, "Модальное окно закрыто")
            }
            setMessages([])
            setWs(null)
            setConnectionStatus("connecting")
        }
    }, [isOpen, questionId])

    const sendMessage = useCallback(() => {
        if (!inputValue.trim() || !ws) return

        if (ws.readyState === WebSocket.OPEN) {
            const messageData = {
                message: inputValue,
                is_admin: isAdmin,
            }

            ws.send(JSON.stringify(messageData))
            setInputValue("")
        }
    }, [inputValue, ws, isAdmin])

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl h-[800px] flex flex-col">
                <DialogHeader>
                    <div className="flex  items-center">
                        <DialogTitle>Чат #{questionId}</DialogTitle>
                    </div>
                </DialogHeader>

                <ScrollArea className="flex-1 p-4 border rounded-lg bg-muted/30">
                    <div className="space-y-3">
                        {messages.length === 0 ? (
                            <div className="text-muted-foreground text-center py-8">Нет сообщений. Будьте первым!</div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div key={msg.id || idx} className={`flex ${msg.is_admin ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`p-3 rounded-lg max-w-xs ${
                                            msg.is_admin ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                                        }`}
                                    >
                                        <div className="text-xs opacity-70 mb-1">
                                            {msg.username || (msg.is_admin ? "Админ" : "Пользователь")}
                                            {msg.timestamp && <span className="ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>}
                                        </div>
                                        <div className="text-sm whitespace-pre-wrap break-words">{msg.message}</div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                <div className="flex gap-2 pt-4">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Введите сообщение..."
                        disabled={connectionStatus !== "connected"}
                        className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={connectionStatus !== "connected" || !inputValue.trim()}>
                        Отправить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ChatModal
