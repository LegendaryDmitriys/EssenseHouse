import React, { useState } from 'react';


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
            {isOpen && (
                <div className="faq-answer">
                    <p>{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs: FAQ[] = [
        { question: 'Что входит в стоимость дома под ключ?', answer: 'В стоимость дома под ключ входят все работы по строительству, включая проектирование, материалы и отделку.' },
        { question: 'Можно ли изменить проект дома в процессе строительства?', answer: 'Да, проект можно изменять на ранних этапах строительства. Однако изменения могут повлиять на сроки и стоимость.' },
        { question: 'Какие материалы используются при строительстве?', answer: 'Мы используем только качественные и проверенные материалы: кирпич, газоблоки, металлоконструкции, а также современные теплоизоляционные материалы.' },
        { question: 'Есть ли гарантия на построенный дом?', answer: 'Да, на все дома предоставляется гарантия сроком на 5 лет, включая строительные работы и материалы.' },
        { question: 'Как происходит оплата за строительство дома?', answer: 'Оплата происходит поэтапно. Сначала авансовый платеж, далее оплата по договоренности по мере выполнения строительных работ.' },
        { question: 'Включена ли в стоимость инженерная инфраструктура?', answer: 'В стоимость дома под ключ включены основные инженерные системы: отопление, водоснабжение, электроснабжение и вентиляция. Дополнительные системы могут обсуждаться отдельно.' },
    ];

    return (
        <section className='section block-content'>
        <div className="container ">
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
