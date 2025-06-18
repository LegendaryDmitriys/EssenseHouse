import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import React, {useEffect, useState} from "react";
import config from "@/api/api.ts";
import {useAuth} from "@/context/AuthContext.tsx";

const ContactForm = ({ onIsContactVisible }) => {
    const { user } = useAuth()

    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone: user?.phone_number || '',
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone_number,
            }));
        }
    }, [user]);


    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append("first_name", formData.first_name);
            data.append("last_name", formData.last_name);
            data.append("phone", formData.phone);

            const headers = {};

            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }


            const response = await fetch(`${config.API_URL}user-questions/`, {
                method: "POST",
                headers,
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            toast.success("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
            setFormData({ first_name: "", last_name: "", phone: "" });
            onIsContactVisible(false);

        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onIsContactVisible(false);
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-lg p-8 max-w-md w-full"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-heading">Связаться с нами</h3>
                    <button
                        onClick={() => onIsContactVisible(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Ваше имя
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Иван"
                            disabled={!!(user?.first_name)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Ваша фамилия
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Иванов"
                            disabled={!!(user?.last_name)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Телефон
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="+7 (999) 999-99-99"
                            disabled={!!(user?.phone_number)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                    >
                        {isSubmitting ? "Отправка..." : "Отправить"}
                    </Button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ContactForm;