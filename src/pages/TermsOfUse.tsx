import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const TermsOfUse = () => {
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
                        Условия использования
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Перед использованием нашего сайта и услуг, пожалуйста, внимательно ознакомьтесь
                        с данными условиями использования.
                    </p>
                </div>

                <div className="space-y-10 text-gray-700">
                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  1
                                </span>
                                Принятие условий
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Используя сайт EssenseHouse, вы подтверждаете, что прочитали, поняли и согласились
                                с настоящими Условиями использования. Если вы не согласны с любой частью этих
                                условий, вам не разрешается использовать наш сайт.
                            </p>
                            <p className="leading-relaxed">
                                Мы оставляем за собой право в любое время изменять эти условия. Продолжая использовать
                                сайт после внесения изменений, вы принимаете новые условия.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  2
                                </span>
                                Использование сайта
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Сайт EssenseHouse предназначен для предоставления информации о наших услугах
                                по строительству домов под ключ. Вы можете использовать наш сайт только в
                                законных целях и в соответствии с настоящими условиями.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                Вы соглашаетесь не использовать сайт:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>В нарушение любых применимых законов или нормативных актов</li>
                                <li>Для передачи любого материала, который является незаконным, оскорбительным или неприемлемым</li>
                                <li>Для сбора или отслеживания личной информации других пользователей</li>
                                <li>Для рассылки спама или любых других несанкционированных рекламных материалов</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  3
                                </span>
                                Интеллектуальная собственность
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Весь контент, представленный на сайте, включая, но не ограничиваясь текстами,
                                графикой, логотипами, изображениями, аудио и видео клипами, является собственностью
                                компании EssenseHouse и защищен законами об интеллектуальной собственности.
                            </p>
                            <p className="leading-relaxed">
                                Вы можете просматривать, загружать и распечатывать материалы с нашего сайта
                                только для личного, некоммерческого использования, при условии, что вы не
                                удаляете или не изменяете какие-либо уведомления об авторских правах или
                                других правах собственности.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  4
                                </span>
                                Ограничение ответственности
                            </h2>
                            <p className="mb-4 leading-relaxed">
                                Информация на сайте предоставляется "как есть" без каких-либо гарантий, явных или
                                подразумеваемых. Компания EssenseHouse не гарантирует точность, полноту или
                                актуальность информации на сайте.
                            </p>
                            <p className="leading-relaxed">
                                Ни при каких обстоятельствах компания EssenseHouse не несет ответственности за
                                любой прямой, косвенный, случайный, особый или последующий ущерб, возникший в
                                результате использования или невозможности использования сайта.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="glass-card rounded-xl p-6 sm:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="bg-essence/10 text-essence rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">
                                  5
                                </span>
                                Применимое право
                            </h2>
                            <p className="leading-relaxed">
                                Настоящие условия использования регулируются и толкуются в соответствии с
                                законодательством Российской Федерации. Любые споры, возникающие в связи с
                                использованием сайта, подлежат разрешению в судах Российской Федерации.
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
                                Если у вас возникли вопросы относительно наших условий использования,
                                пожалуйста, свяжитесь с нами:
                            </p>
                            <div className="bg-essence/5 rounded-lg p-4 max-w-sm">
                                <p className="text-gray-800 mb-1">EssenseHouse</p>
                                <p className="text-gray-800 mb-1">Email: legal@essensehouse.ru</p>
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

export default TermsOfUse;
