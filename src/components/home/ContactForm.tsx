import {motion} from "framer-motion";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import React from "react";


const ContactForm = ({ onIsContactVisible }) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onIsContactVisible(false);
            }}
        >
            <motion.div
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
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
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Ваше имя
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Иван Иванов"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Телефон
                        </label>
                        <input
                            type="tel"
                            className="w-full p-2 border rounded-md"
                            placeholder="+7 (999) 999-99-99"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Сообщение
                        </label>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            rows={4}
                            placeholder="Ваше сообщение..."
                        />
                    </div>
                    <Button
                        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                        onClick={(e) => {
                            e.preventDefault();
                            toast.success("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
                            onIsContactVisible(false);
                        }}
                    >
                        Отправить
                    </Button>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default ContactForm