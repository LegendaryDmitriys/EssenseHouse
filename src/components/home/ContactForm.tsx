import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import React, { useState } from "react";
import config from "@/api/api.ts";

const ContactForm = ({ onIsContactVisible }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

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
            data.append ("name", formData.name);
            data.append("phone", formData.phone);


            const response = await fetch(`${config.API_URL}user-questions/`, {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            toast.success("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
            setFormData({ name: "", phone: "" });
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
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Иван Иванов"
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