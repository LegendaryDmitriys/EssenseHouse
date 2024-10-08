import React from 'react'
import '../../public/house514x514.png'

const Outer: React.FC = () => {
    return (
        <section className="section block-content">
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-half">
                        <figure className="image is-4by3">
                            <img src="../../public/house514x514.png" alt="Дом" />
                        </figure>
                    </div>
                <div className="column is-half">
                    <h2 className="title-main">ПОЧЕМУ ВЫБИРАЮТ НАС?</h2>
                    <p className="content text-main">
                    Мы предлагаем комплексное строительство домов под ключ с полным сопровождением на всех этапах — от проектирования до сдачи готового объекта. Наши клиенты выбирают нас за высокое качество работы, надёжность и использование только проверенных материалов. Более 10 лет опыта позволяют нам успешно реализовывать проекты любой сложности, учитывая индивидуальные пожелания и бюджет каждого заказчика. Мы гарантируем фиксированные цены, соблюдение сроков и прозрачность на всех этапах сотрудничества, чтобы вы могли быть уверены в результате.
                    </p>
                    <div className="columns">
                        <div className="column has-text-centered">
                            <h1 className="title is-1 number">5</h1>
                            <p>гарантий по договору</p>
                        </div>
                        <div className="column has-text-centered">
                            <h1 className="title is-1 number">120</h1>
                            <p>дней от проекта до новоселья</p>
                        </div>
                        <div className="column has-text-centered">
                            <h1 className="title is-1 number">40+</h1>
                            <p>лет срок службы</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Outer