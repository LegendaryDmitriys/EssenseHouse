import React, {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {faqs} from "./faqData.ts";


interface FAQ {
    question: string;
    answer: string;
}

const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={toggleAnswer} style={{ cursor: 'pointer' }}>
                <h4 className='text-main'>{faq.question}</h4>
                <span className='signs'>{isOpen ? '-' : '+'}</span>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    return (
        <section className='section block-content'>
            <div className="container">
                <h2 className="title-main">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
                <div className="columns is-multiline">
                    {faqs.map((faq, index) => (
                        <div className="column is-half" key={index}>
                            <FAQItem faq={faq} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
