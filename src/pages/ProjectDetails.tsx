import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowLeft,
    Building2,
    Home,
    Map,
    Box,
    Check,
    Clock4,
    Crown,
    Bath,
    ChefHat,
    BarcodeIcon as Garage,
    Phone,
    Heart,
    MessageSquare,
    ShoppingBag,
    FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { House } from "@/types/house"
import config from "@/api/api"
import { useAuth } from "@/context/AuthContext.tsx"
import { cn } from "@/lib/utils.ts"
import { useOfflineQueue } from "@/hooks/useOfflineHandler.ts"
import { toast } from "sonner"

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIsMobile()

        window.addEventListener("resize", checkIsMobile)

        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    return isMobile
}

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>()
    const { addToFavorites, removeFromFavorites, favorites, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [house, setHouse] = useState<House | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>("overview")
    const [isImageExpanded, setIsImageExpanded] = useState(false)
    const isMobile = useIsMobile()
    const { sendRequest } = useOfflineQueue((message) => {
        toast.info(message)
    })

    const isFavorite = id ? favorites.includes(id) : false

    const handleFavoriteToggle = () => {
        if (!id) return

        if (isFavorite) {
            removeFromFavorites(id)
        } else {
            addToFavorites(id)
        }
    }

    const [orderForm, setOrderForm] = useState({
        name: "",
        phone: "",
        email: "",
        construction_place: "",
        message: "",
        agreeToTerms: false,
    })

    const [questionForm, setQuestionForm] = useState({
        name: "",
        phone: "",
        email: "",
        question: "",
        agreeToTerms: false,
    })

    const [orderSubmitting, setOrderSubmitting] = useState(false)
    const [questionSubmitting, setQuestionSubmitting] = useState(false)
    const [orderDialogOpen, setOrderDialogOpen] = useState(false)
    const [questionDialogOpen, setQuestionDialogOpen] = useState(false)

    useEffect(() => {
        const fetchHouse = async () => {
            if (id) {
                try {
                    setLoading(true)
                    const response = await fetch(`${config.API_URL}houses/${id}/`)
                    if (!response.ok) {
                        throw new Error(`HTTP ошибка! Статус: ${response.status}`)
                    }
                    const data = await response.json()
                    setHouse(data)
                } catch (e) {
                    setError(e instanceof Error ? e.message : "Произошла ошибка при получении данных о доме.")
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchHouse()
    }, [id])

    const handleOrderFormChange = (e) => {
        const { name, value, type, checked } = e.target
        setOrderForm({
            ...orderForm,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleQuestionFormChange = (e) => {
        const { name, value, type, checked } = e.target
        setQuestionForm({
            ...questionForm,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleOrderSubmit = async (e) => {
        e.preventDefault()
        if (!orderForm.agreeToTerms) {
            return
        }

        setOrderSubmitting(true)
        try {
            const formData = new FormData()
            formData.append("name", orderForm.name)
            formData.append("phone", orderForm.phone)
            formData.append("email", orderForm.email)
            formData.append("construction_place", orderForm.construction_place)
            formData.append("message", orderForm.message)
            formData.append("house", house.id.toString())

            const payload = Object.fromEntries(formData)

            const success = await sendRequest(`${config.API_URL}orders/`, payload)

            if (success) {
                toast.success("Заявка на заказ проекта успешно отправлена!")
                setOrderForm({
                    name: "",
                    phone: "",
                    email: "",
                    construction_place: "",
                    message: "",
                    agreeToTerms: false,
                })
                setOrderDialogOpen(false)
            }
        } catch (error) {
            console.error("Ошибка при отправки заказа:", error)
        } finally {
            setOrderSubmitting(false)
        }
    }

    const handleQuestionSubmit = async (e) => {
        e.preventDefault()
        if (!questionForm.agreeToTerms) {
            return
        }

        setQuestionSubmitting(true)
        try {
            const formData = new FormData()
            formData.append("name", questionForm.name)
            formData.append("phone", questionForm.phone)
            formData.append("email", questionForm.email)
            formData.append("question", questionForm.question)
            formData.append("house", house.id.toString())

            const payload = Object.fromEntries(formData)

            const success = await sendRequest(`${config.API_URL}house-questions/`, payload)

            setQuestionForm({
                name: "",
                phone: "",
                email: "",
                question: "",
                agreeToTerms: false,
            })

            setQuestionDialogOpen(false)
        } catch (error) {
            console.error("Ошибка при отправки вопроса:", error)
        } finally {
            setQuestionSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-zinc-600 font-medium">Загрузка проекта...</p>
                </motion.div>
            </div>
        )
    }

    if (error || !house) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-zinc-800 mb-4">Ошибка загрузки проекта</h2>
                    <p className="text-zinc-600 mb-6">{error || "Проект не найден"}</p>
                    <Button onClick={() => navigate("/projects")}>Вернуться к списку проектов</Button>
                </div>
            </div>
        )
    }

    const calculateDiscount = () => {
        if (house.discount && house.discount > 0) {
            return house.discount
        }
        return null
    }

    const handleExpandImage = () => {
        setIsImageExpanded(!isImageExpanded)
    }

    return (
        <div className="min-h-screen bg-zinc-50 pb-16">
            <div className="relative h-[400px] md:h-[600px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
                    style={{
                        backgroundImage: `url('${house.images && house.images.length > 0 ? `${config.API_URL}${house.images[0].image}` : "/placeholder.svg?height=600&width=800"}')`,
                        transform: isImageExpanded ? "scale(1.1)" : "scale(1)",
                    }}
                    onClick={handleExpandImage}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

                <div className="container mx-auto px-4 py-12 md:py-24 relative h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/90 hover:bg-white text-zinc-800 font-medium"
                                onClick={() => navigate("/projects")}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                <span className="hidden md:inline">Назад к проектам</span>
                                <span className="md:hidden">Назад</span>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex gap-2"
                        >
                            <Button
                                variant={isFavorite ? "default" : "outline"}
                                size={isMobile ? "sm" : "default"}
                                className={isFavorite ? "bg-white/90 hover:bg-white text-zinc-800" : ""}
                                onClick={handleFavoriteToggle}
                            >
                                <Heart className={cn("h-4 w-4", isFavorite ? "fill-current" : "")} />
                                <span className="ml-2 hidden md:inline">{isFavorite ? "В избранном" : "В избранное"}</span>
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6"
                    >
                        <div className="space-y-2 md:space-y-4">
                            <div className="flex flex-wrap gap-1 md:gap-2">
                                {house.new && (
                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-2 md:px-3 py-0.5 md:py-1 text-xs">
                                        Новинка
                                    </Badge>
                                )}
                                {house.best_seller && (
                                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-2 md:px-3 py-0.5 md:py-1 text-xs">
                                        {house.best_seller}
                                    </Badge>
                                )}
                                {calculateDiscount() && (
                                    <Badge className="bg-red-500 hover:bg-red-600 text-white font-medium px-2 md:px-3 py-0.5 md:py-1 text-xs">
                                        Скидка {calculateDiscount()}%
                                    </Badge>
                                )}
                                <Badge className="bg-zinc-700 hover:bg-zinc-800 text-white font-medium px-2 md:px-3 py-0.5 md:py-1 text-xs">
                                    {house.category_details.name}
                                </Badge>
                            </div>

                            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">{house.title}</h1>

                            <p className="text-white/90 text-sm md:text-lg max-w-2xl">{house.description.split(".")[0]}.</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg w-full md:w-auto">
                            <div className="space-y-2">
                                <p className="text-xs md:text-sm text-zinc-500 font-medium">Стоимость проекта</p>
                                {house.discount && house.discount > 0 ? (
                                    <div className="space-y-1">
                    <span className="text-xs md:text-sm line-through text-zinc-400">
                      {new Intl.NumberFormat("ru-RU").format(Number.parseFloat(house.price))} ₽
                    </span>
                                        <div className="text-xl md:text-3xl font-bold text-primary">
                                            {new Intl.NumberFormat("ru-RU").format(house.new_price || 0)} ₽
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-xl md:text-3xl font-bold text-primary">
                                        {new Intl.NumberFormat("ru-RU").format(Number.parseFloat(house.price))} ₽
                                    </div>
                                )}
                                <Button
                                    className="w-full mt-2 md:mt-3 font-medium text-sm md:text-base"
                                    onClick={() => setOrderDialogOpen(true)}
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                    Заказать проект
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="bg-white border-b border-zinc-200 sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between overflow-x-auto py-2 md:py-4 gap-2 md:gap-8">
                        <div className="flex items-center gap-1 md:gap-2 min-w-max">
                            <Home className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            <div>
                                <p className="text-[10px] md:text-xs text-zinc-500">Площадь</p>
                                <p className="text-xs md:text-base font-medium">{house.area} м²</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 min-w-max">
                            <Building2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            <div>
                                <p className="text-[10px] md:text-xs text-zinc-500">Этажи</p>
                                <p className="text-xs md:text-base font-medium">{house.floors}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 min-w-max">
                            <Box className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            <div>
                                <p className="text-[10px] md:text-xs text-zinc-500">Комнаты</p>
                                <p className="text-xs md:text-base font-medium">{house.rooms}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 min-w-max">
                            <Crown className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            <div>
                                <p className="text-[10px] md:text-xs text-zinc-500">Спальни</p>
                                <p className="text-xs md:text-base font-medium">{house.bedrooms}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 min-w-max">
                            <Bath className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            <div>
                                <p className="text-[10px] md:text-xs text-zinc-500">Санузлы</p>
                                <p className="text-xs md:text-base font-medium">{house.bathrooms}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 min-w-max">
                            <Clock4 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            <div>
                                <p className="text-[10px] md:text-xs text-zinc-500">Срок</p>
                                <p className="text-xs md:text-base font-medium">{house.construction_time} мес.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full bg-white p-1 rounded-xl shadow-sm grid grid-cols-2 md:grid-cols-5 gap-1">
                                <TabsTrigger
                                    value="overview"
                                    className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm"
                                >
                                    Обзор
                                </TabsTrigger>
                                <TabsTrigger
                                    value="plans"
                                    className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm"
                                >
                                    Планировка
                                </TabsTrigger>
                                <TabsTrigger
                                    value="interiors"
                                    className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm"
                                >
                                    Интерьер
                                </TabsTrigger>
                                <TabsTrigger
                                    value="facades"
                                    className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm"
                                >
                                    Фасад
                                </TabsTrigger>
                                <TabsTrigger
                                    value="documents"
                                    className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm"
                                >
                                    Документы
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-8 space-y-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card className="border-none shadow-md overflow-hidden">
                                            <CardContent className="pt-6">
                                                {house.images && house.images.length > 0 ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {house.images.map((image) => (
                                                            <div
                                                                key={image.id}
                                                                className="relative rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                                                                onClick={() => {
                                                                    window.open(`${config.API_URL}${image.image}`, "_blank")
                                                                }}
                                                            >
                                                                <img
                                                                    src={`${config.API_URL}${image.image}`}
                                                                    alt={`Изображение ${house.title}`}
                                                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Card className="border-none shadow-md overflow-hidden">
                                                        <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                                                            <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                                                                <FileText className="w-10 h-10 text-zinc-400" />
                                                            </div>
                                                            <h3 className="text-2xl font-semibold text-zinc-700 mb-2">Изображения отсутствуют</h3>
                                                            <p className="text-zinc-500 text-center max-w-md">
                                                                Фотографии проекта будут добавлены позже.
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </CardContent>
                                        </Card>

                                        <Card className="border-none shadow-md overflow-hidden">
                                            <CardHeader className="bg-zinc-50 pb-4">
                                                <CardTitle className="text-2xl font-bold">Описание проекта</CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <div className="prose prose-zinc max-w-none">
                                                    <p className="text-zinc-700 text-lg leading-relaxed">{house.description}</p>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <h2 className="text-2xl font-bold mt-10 mb-6">Характеристики проекта</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <Home className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Общая площадь</h3>
                                                    <p className="text-zinc-600 text-lg">{house.area} м²</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <Building2 className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Этажность</h3>
                                                    <p className="text-zinc-600 text-lg">{house.floors} этажа</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <Map className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Жилая площадь</h3>
                                                    <p className="text-zinc-600 text-lg">{house.living_area} м²</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <Box className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Количество комнат</h3>
                                                    <p className="text-zinc-600 text-lg">{house.rooms}</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <Crown className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Спальни</h3>
                                                    <p className="text-zinc-600 text-lg">{house.bedrooms}</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <Bath className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Санузлы</h3>
                                                    <p className="text-zinc-600 text-lg">{house.bathrooms}</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <ChefHat className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Площадь кухни</h3>
                                                    <p className="text-zinc-600 text-lg">{house.kitchen_area} м²</p>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <CardContent className="p-6 flex flex-col items-center text-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                        <Clock4 className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-1">Срок строительства</h3>
                                                    <p className="text-zinc-600 text-lg">{house.construction_time} месяцев</p>
                                                </CardContent>
                                            </Card>

                                            {house.garage && (
                                                <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                            <Garage className="w-8 h-8 text-primary" />
                                                        </div>
                                                        <h3 className="text-lg font-semibold mb-1">Гараж</h3>
                                                        <p className="text-zinc-600 text-lg">на {house.garage} машину</p>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>

                                        <Card className="border-none shadow-md overflow-hidden mt-10">
                                            <CardHeader className="bg-zinc-50 pb-4">
                                                <CardTitle className="text-2xl font-bold">Технология строительства</CardTitle>
                                                <CardDescription>{house.construction_technology_details.name}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <div className="prose prose-zinc max-w-none">
                                                    <p className="text-zinc-700 text-lg leading-relaxed">
                                                        Мы используем современные технологии строительства, которые обеспечивают высокую прочность,
                                                        энергоэффективность и долговечность дома. {house.construction_technology_details.name} - это
                                                        надежный выбор для вашего будущего дома.
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                    <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
                                                        <div className="bg-primary/10 p-2 rounded-full">
                                                            <Check className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <p className="text-zinc-700 font-medium">Высокая прочность и надежность конструкции</p>
                                                    </div>
                                                    <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
                                                        <div className="bg-primary/10 p-2 rounded-full">
                                                            <Check className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <p className="text-zinc-700 font-medium">Отличная теплоизоляция и звукоизоляция</p>
                                                    </div>
                                                    <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
                                                        <div className="bg-primary/10 p-2 rounded-full">
                                                            <Check className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <p className="text-zinc-700 font-medium">Экологичность и безопасность материалов</p>
                                                    </div>
                                                    <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
                                                        <div className="bg-primary/10 p-2 rounded-full">
                                                            <Check className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <p className="text-zinc-700 font-medium">
                                                            Долговечность и устойчивость к внешним воздействиям
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>

                            <TabsContent value="plans" className="mt-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="plans"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {house.layout_images && house.layout_images.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {house.layout_images.map((image) => (
                                                    <Card
                                                        key={image.id}
                                                        className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                                    >
                                                        <img
                                                            src={`${config.API_URL}${image.image}`}
                                                            alt={`Планировка ${house.title}`}
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <Card className="border-none shadow-md overflow-hidden">
                                                <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                                                    <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                                                        <Map className="w-10 h-10 text-zinc-400" />
                                                    </div>
                                                    <h3 className="text-2xl font-semibold text-zinc-700 mb-2">Нет данных о планировке</h3>
                                                    <p className="text-zinc-500 text-center max-w-md">
                                                        Планы этажей пока не добавлены. Свяжитесь с нами, чтобы узнать больше.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>

                            <TabsContent value="interiors" className="mt-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="interiors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {house.interior_images && house.interior_images.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {house.interior_images.map((image) => (
                                                    <Card
                                                        key={image.id}
                                                        className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                                    >
                                                        <img
                                                            src={`${config.API_URL}${image.image}`}
                                                            alt={`Интерьер ${house.title}`}
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <Card className="border-none shadow-md overflow-hidden">
                                                <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                                                    <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                                                        <Home className="w-10 h-10 text-zinc-400" />
                                                    </div>
                                                    <h3 className="text-2xl font-semibold text-zinc-700 mb-2">Нет данных об интерьере</h3>
                                                    <p className="text-zinc-500 text-center max-w-md">
                                                        Интерьерные решения пока не добавлены. Свяжитесь с нами, чтобы узнать больше.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>

                            <TabsContent value="facades" className="mt-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="facades"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {house.facade_images && house.facade_images.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {house.facade_images.map((image) => (
                                                    <Card
                                                        key={image.id}
                                                        className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                                    >
                                                        <img
                                                            src={`${config.API_URL}${image.image}`}
                                                            alt={`Фасад ${house.title}`}
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <Card className="border-none shadow-md overflow-hidden">
                                                <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                                                    <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                                                        <Building2 className="w-10 h-10 text-zinc-400" />
                                                    </div>
                                                    <h3 className="text-2xl font-semibold text-zinc-700 mb-2">Нет данных о фасадах</h3>
                                                    <p className="text-zinc-500 text-center max-w-md">
                                                        Фасады пока не добавлены. Свяжитесь с нами, чтобы узнать больше.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>

                            <TabsContent value="documents" className="mt-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="documents"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card className="border-none shadow-md overflow-hidden">
                                            <CardContent className="pt-6">
                                                {house.documents && house.documents.length > 0 ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {house.documents.map((doc, index) => (
                                                            <Card
                                                                key={index}
                                                                className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                                            >
                                                                <CardContent className="p-4 flex items-center justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                                            <FileText className="w-5 h-5 text-primary" />
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-medium">{doc.title}</h4>
                                                                            <p className="text-xs text-zinc-500">
                                                                                {doc.file.split(".").pop().toUpperCase()} файл
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        asChild
                                                                        className="text-primary hover:text-primary"
                                                                    >
                                                                        <a href={`${config.API_URL}${doc.file}`} download>
                                                                            Скачать
                                                                        </a>
                                                                    </Button>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Card className="border-none shadow-md overflow-hidden">
                                                        <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                                                            <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                                                                <FileText className="w-10 h-10 text-zinc-400" />
                                                            </div>
                                                            <h3 className="text-2xl font-semibold text-zinc-700 mb-2">Документы отсутствуют</h3>
                                                            <p className="text-zinc-500 text-center max-w-md">
                                                                Техническая документация по проекту будет доступна позже.
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Card className="border-none shadow-lg overflow-hidden">
                                <CardHeader className="bg-primary text-white">
                                    <CardTitle className="text-xl font-bold">Заинтересовал проект?</CardTitle>
                                    <CardDescription className="text-white/80">Получите бесплатную консультацию</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <p className="text-zinc-600">
                                        Оставьте заявку, и наши специалисты свяжутся с вами в ближайшее время для консультации по всем
                                        вопросам.
                                    </p>

                                    <div className="grid grid-cols-1 gap-4">
                                        <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button className="w-full" size="lg">
                                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                                    Заказать проект
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader>
                                                    <DialogTitle>Заказать проект</DialogTitle>
                                                    <DialogDescription>
                                                        Заполните форму ниже, и мы свяжемся с вами для обсуждения деталей.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleOrderSubmit}>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="order-name">Ваше имя</Label>
                                                            <Input
                                                                id="order-name"
                                                                name="name"
                                                                value={orderForm.name}
                                                                onChange={handleOrderFormChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="order-phone">Телефон</Label>
                                                            <Input
                                                                id="order-phone"
                                                                name="phone"
                                                                value={orderForm.phone}
                                                                onChange={handleOrderFormChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="order-email">Почта</Label>
                                                            <Input
                                                                id="order-email"
                                                                name="email"
                                                                type="email"
                                                                value={orderForm.email}
                                                                onChange={handleOrderFormChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="order-project">Проект</Label>
                                                            <Input id="order-project" value={house?.title || ""} disabled />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="order-construction_place">Место строительства</Label>
                                                            <Input
                                                                id="order-construction_place"
                                                                name="construction_place"
                                                                value={orderForm.construction_place}
                                                                onChange={handleOrderFormChange}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="order-message">Сообщение</Label>
                                                            <Textarea
                                                                id="order-message"
                                                                name="message"
                                                                value={orderForm.message}
                                                                onChange={handleOrderFormChange}
                                                                rows={3}
                                                            />
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id="order-terms"
                                                                name="agreeToTerms"
                                                                checked={orderForm.agreeToTerms}
                                                                onCheckedChange={(checked) =>
                                                                    setOrderForm({ ...orderForm, agreeToTerms: checked === true })
                                                                }
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="order-terms"
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Я согласен на обработку персональных данных
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" disabled={orderSubmitting || !orderForm.agreeToTerms}>
                                                            {orderSubmitting ? "Отправка..." : "Отправить заявку"}
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>

                                        <Dialog open={questionDialogOpen} onOpenChange={setQuestionDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="w-full" size="lg">
                                                    <MessageSquare className="w-4 h-4 mr-2" />
                                                    Задать вопрос
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader>
                                                    <DialogTitle>Задать вопрос</DialogTitle>
                                                    <DialogDescription>Заполните форму ниже, и мы ответим на все ваши вопросы.</DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleQuestionSubmit}>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="question-name">Ваше имя</Label>
                                                            <Input
                                                                id="question-name"
                                                                name="name"
                                                                value={questionForm.name}
                                                                onChange={handleQuestionFormChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="question-phone">Телефон</Label>
                                                            <Input
                                                                id="question-phone"
                                                                name="phone"
                                                                value={questionForm.phone}
                                                                onChange={handleQuestionFormChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="question-email">Почта</Label>
                                                            <Input
                                                                id="question-email"
                                                                name="email"
                                                                type="email"
                                                                value={questionForm.email}
                                                                onChange={handleQuestionFormChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="question-project">Интересующий товар/проект</Label>
                                                            <Input id="question-project" value={house?.title || ""} disabled />
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            <Label htmlFor="question-text">Ваш вопрос</Label>
                                                            <Textarea
                                                                id="question-text"
                                                                name="question"
                                                                value={questionForm.question}
                                                                onChange={handleQuestionFormChange}
                                                                rows={4}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id="question-terms"
                                                                name="agreeToTerms"
                                                                checked={questionForm.agreeToTerms}
                                                                onCheckedChange={(checked) =>
                                                                    setQuestionForm({ ...questionForm, agreeToTerms: checked === true })
                                                                }
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="question-terms"
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Я согласен на обработку персональных данных
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" disabled={questionSubmitting || !questionForm.agreeToTerms}>
                                                            {questionSubmitting ? "Отправка..." : "Отправить вопрос"}
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-zinc-50 px-6 py-4">
                                    <div className="flex items-center gap-2 text-zinc-600">
                                        <Phone className="w-4 h-4 text-primary" />
                                        <span>
                                          Или позвоните нам:{" "}
                                            <a href="tel:+78001234567" className="font-medium text-primary hover:underline">
                                                8 (800) 123-45-67
                                            </a>
                                        </span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail
