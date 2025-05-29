import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import config from "@/api/api.ts";
import Layout from "@/components/admin/dashboard/Layout.tsx";
import {Review} from "@/types/review.ts";
import UserReviewsTable from "@/components/admin/reviews/UserReviewsTable.tsx";
import UserReviewsDetails from "@/components/admin/reviews/UserReviewsDetails.tsx";

const Reviews = () => {
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const queryClient = useQueryClient();


    const handleStatusChange = async (reviewId: number, newStatus: Review["status"]) => {
        try {
            const formData = new FormData();
            formData.append("status", newStatus);

            const response = await fetch(`${config.API_URL}reviews/${reviewId}/`, {
                method: "PUT",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });

            if (!response.ok) {
                throw new Error("Ошибка во время обновления отзыва");
            }

            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success("Статус отзыва успешно обновлен");
        } catch (error) {
            toast.error("Ошибка при обновлении статуса отзыва");
        }
    };

    const handleDelete = async (reviewId: number) => {
        try {
            const response = await fetch(`${config.API_URL}reviews/${reviewId}/`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });

            if (!response.ok) {
                throw new Error("Ошибка во время удаления отзыва");
            }

            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            setSelectedReview(null);
            toast.success("Отзыв успешно удален");
        } catch (error) {
            toast.error("Ошибка при удалении отзыва");
        }
    };

    return (
        <Layout>
            <div className="flex gap-6">
                <div className="w-1/2">
                    <UserReviewsTable onReviewSelect={setSelectedReview}/>
                </div>
                {selectedReview && (
                    <div className="w-1/2">
                        <UserReviewsDetails
                            review={selectedReview}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Reviews;
