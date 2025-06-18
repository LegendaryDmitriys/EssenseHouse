import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="animate-fade-up">
                <div className="text-center mb-10">
                    <span className="inline-block bg-essence/10 text-essence font-medium rounded-full px-3 py-1 text-sm mb-3">
                        Документация
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Политика конфиденциальности
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Мы уважаем вашу конфиденциальность и берем на себя ответственность за ваши данные.
                        Ознакомьтесь с нашей политикой.
                    </p>
                </div>

                <div className="space-y-10 text-gray-700">
                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  1
                                </span>
                                Общие положения
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Настоящая политика конфиденциальности описывает, как компания EssenseHouse собирает,
                                использует и защищает информацию, полученную от пользователей нашего сайта.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                Эта политика применяется к сайту и всем продуктам и услугам, предлагаемым компанией
                                EssenseHouse. Используя наш сайт, вы соглашаетесь с условиями данной политики.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  2
                                </span>
                                Сбор информации
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Мы собираем персональную информацию, которую вы предоставляете добровольно
                                при заполнении форм на нашем сайте, включая: имя, контактные данные, адрес
                                электронной почты и телефонный номер.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                Мы также автоматически собираем определенную информацию о вашем посещении сайта,
                                такую как IP-адрес, тип браузера, время доступа и посещенные страницы.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  3
                                </span>
                                Использование информации
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Собранная информация может использоваться для:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Улучшения качества обслуживания клиентов</li>
                                <li>Персонализации пользовательского опыта</li>
                                <li>Обработки транзакций и выполнения договорных обязательств</li>
                                <li>Отправки периодических писем с информацией или рекламой</li>
                                <li>Улучшения нашего сайта и маркетинговых исследований</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  4
                                </span>
                                Защита информации
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Мы применяем соответствующие меры безопасности для защиты от несанкционированного
                                доступа, изменения, раскрытия или уничтожения вашей персональной информации.
                            </p>
                            <p className="leading-relaxed">
                                Передача персональных данных осуществляется с использованием технологии шифрования
                                и защищенных протоколов передачи данных.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  5
                                </span>
                                Раскрытие информации третьим лицам
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Мы не продаем, не обмениваем и не передаем вашу персональную информацию третьим
                                лицам без вашего согласия, за исключением случаев, когда это необходимо для
                                предоставления запрошенных вами услуг.
                            </p>
                            <p className="leading-relaxed">
                                Это не включает доверенных третьих лиц, которые помогают нам в управлении нашим
                                сайтом или ведении бизнеса, при условии, что эти стороны соглашаются сохранять
                                конфиденциальность этой информации.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  6
                                </span>
                                Контактная информация
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Если у вас возникли вопросы или предложения относительно нашей политики
                                конфиденциальности, пожалуйста, свяжитесь с нами:
                            </p>
                            <div className="bg-essence/5 rounded-lg p-4 max-w-sm">
                                <p className="text-gray-800 mb-1">EssenseHouse</p>
                                <p className="text-gray-800 mb-1">Email: privacy@essensehouse.ru</p>
                                <p className="text-gray-800">Телефон: +7 (999) 123-45-67</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="text-center mt-12">
                    <a href="/" className="button-essence inline-flex items-center group">
                        Вернуться на главную
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;