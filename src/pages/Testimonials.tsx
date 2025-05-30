import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
    Star,
    Quote,
    PlusCircle,
    File,
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    NotebookPen
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ReviewForm from "@/components/ReviewForm"
import { toast } from "sonner"
import config from "@/api/api"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import {cn} from "@/lib/utils.ts";
import {Review, ReviewFile} from "@/types/review.ts";



const getFileIcon = (file: ReviewFile) => {
    const fileType = file.file_type
    if (fileType.includes("image")) return <FileImage className="w-6 h-6" />
    if (fileType.includes("video")) return <FileVideo className="w-6 h-6" />
    if (fileType.includes("audio")) return <FileAudio className="w-6 h-6" />
    if (
        fileType.includes("text") ||
        fileType.includes("document") ||
        fileType.includes("msword") ||
        fileType.includes("wordprocessingml")
    ) {
        return <FileText className="w-6 h-6" />
    }
    return <File className="w-6 h-6" />
}

const downloadFile = (file: ReviewFile) => {
    const url = file.file
    const a = document.createElement("a")
    a.href = url
    a.download = file.file_name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success(`Файл ${file.file_name} загружается`)
}

const Testimonials = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [pagination, setPagination] = useState<{
        count: number;
        next: string | null;
        previous: string | null;
    }>({ count: 0, next: null, previous: null });

    const itemsPerPage = 6;

    useEffect(() => {
        const fetchReviews = async (url?: string) => {
            setLoading(true);
            try {
                const response = await fetch(url || `${config.API_URL}reviews/?status=published`);
                if (!response.ok) {
                    throw new Error(`HTTP ошибка, Статус: ${response.status}`);
                }
                const result = await response.json();
                setReviews(result.results);
                setPagination({
                    count: result.count,
                    next: result.next,
                    previous: result.previous,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmitReview = (newReview: Review) => {
        if (newReview.status === "published") {
            setReviews([newReview, ...reviews]);
        }
        setIsFormOpen(false);
    };

    const fetchReviews = async (url?: string) => {
        setLoading(true);
        try {
            const response = await fetch(url || `${config.API_URL}reviews/`);
            if (!response.ok) {
                throw new Error(`HTTP ошибка, Статус: ${response.status}`);
            }
            const result = await response.json();
            setReviews(result.results);
            setPagination({
                count: result.count,
                next: result.next,
                previous: result.previous,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <section className="relative h-[40vh] bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                            mixBlendMode: "overlay",
                        }}
                    />
                </div>
                <div className="container relative z-10 h-full flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Отзывы наших клиентов</h1>
                        <p className="text-xl text-white/90">
                            Узнайте, что говорят о нас те, кто уже живет в построенных нами домах
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mt-8">
                <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <SheetTrigger asChild>
                        <Button className="gap-2">
                            <PlusCircle className="w-4 h-4" />
                            Оставить отзыв
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Оставить отзыв</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <ReviewForm onSubmit={handleSubmitReview} onCancel={() => setIsFormOpen(false)} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <section className="py-20">
                <div className="container">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-center py-20">
                            <NotebookPen className="w-12 h-12 mx-auto text-zinc-300 mb-4"/>
                                <h3 className="text-xl font-medium text-zinc-700 mb-2">Отзывы не найдены</h3>
                                <p className="text-zinc-500 mb-6">Будьте первым!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <img
                                                        src={testimonial.image || "/placeholder.svg"}
                                                        alt={`${testimonial.first_name} ${testimonial.last_name}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{testimonial.first_name} {testimonial.last_name}</h4>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                                ))}
                                            </div>
                                            <Quote className="w-8 h-8 text-primary/20 mb-2" />
                                            <p className="text-muted-foreground">{testimonial.review}</p>
                                            {testimonial.files && testimonial.files.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    <p className="text-sm font-medium text-muted-foreground">Прикрепленные файлы:</p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {testimonial.files.map((file, fileIndex) => (
                                                            <button
                                                                key={fileIndex}
                                                                onClick={() => downloadFile(file)}
                                                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                                                                title={file.file_name}
                                                            >
                                                                {getFileIcon(file)}
                                                                <span className="text-sm text-muted-foreground max-w-[150px] truncate">
                                                                  {file.file_name}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <p className="text-sm text-muted-foreground/60 mt-4">
                                                {new Date(testimonial.date).toLocaleDateString()}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                    {(pagination.next || pagination.previous) && (
                        <div className="mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => pagination.previous && fetchReviews(pagination.previous)}
                                            className={cn(!pagination.previous && "pointer-events-none opacity-50")}
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink isActive>
                                            {Math.ceil(reviews.length > 0 ? reviews[0].id / itemsPerPage : 1)}
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => pagination.next && fetchReviews(pagination.next)}
                                            className={cn(!pagination.next && "pointer-events-none opacity-50")}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Testimonials
