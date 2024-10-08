import React from "react";

const Stages: React.FC = () =>{
    const stages = [
        {
          step: "01",
          title: "Личная встреча",
          description: "Обсуждение деталей проекта с менеджером и архитектором, внесение изменений и четкая постановка деталей",
        },
        {
          step: "02",
          title: "Подписание договора",
          description: "Прозрачность и защищенность сделки гарантирует договор с прописанными обязательствами для обеих сторон",
        },
        {
          step: "03",
          title: "Создание индивидуального проекта",
          description: "Разработка индивидуального проекта дома, документация, постановка задачи бригаде и расчет стройматериалов",
        },
        {
          step: "04",
          title: "Подготовка участка",
          description: "Выезд бригады на территорию строительства, завоз строительных материалов, установка бытовки",
        },
        {
          step: "05",
          title: "Возведение фундамента",
          description: "Монтаж фундамента может занимать 1-10 дней, в зависимости от выбранного типа: винтовые сваи, лента, плита",
        },
        {
          step: "06",
          title: "Стены и кровля",
          description: "Устанавливаются стены, перекрытия, вентфасад, монтируется кровля. Также укрепляются стены и делается гидроизоляция",
        },
        {
          step: "07",
          title: "Прокладка коммуникаций",
          description: "Прокладка коммуникаций — свет, вода, вентиляция, отопление и канализация",
        },
        {
         step: "08",
         title: "Отделочные работы",
         description: "Заключительный шаг перед сдачей объекта - его внутрення и внешняя отделка, Дом принимает готовый вид",
        },
        {
         step: "09",
         title: "Дом готов к жизни",
         description: "Ваше жилое пространство готово для жизни",
         isLast: true,
        },
      ];
    return (
        <section className="section block-content">
            <div className="container">
                <h2 className="title-main">Этапы работы с нами</h2>
                {stages.map((stage, index) => (
                    <div key={index} className={`box ${stage.isLast ? 'last-stage' : ''}`}>
                    <div className="columns is-vcentered">
                      <div className="column is-1 has-text-centered">
                        <strong className="is-size-3 grey">{stage.step}.</strong>
                      </div>
                      <div className="column is-flex is-justify-content-space-between">
                      <h3 className={`subtitle-main ${stage.isLast ? 'subtitle-main white' : ''}`}>
                        {stage.title}
                    </h3>
                            <article className="stage-article">
                                <p className="stage-text">{stage.description}</p>
                            </article>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </section>
    )
}

export default Stages;