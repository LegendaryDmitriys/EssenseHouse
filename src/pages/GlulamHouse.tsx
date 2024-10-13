import React, {useState} from 'react'

import { Link } from 'react-router-dom';
// @ts-ignore
import { ROUTES} from '../utils/routes'
import FilterBar from "../components/Project/FilterBar.tsx";
import CatalogMenu from "../components/Project/CatalogMenu.tsx";

const GlulamHouse: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const houseProjects = [
        {
              id: 1,
              title: 'Проект 1 - Дом из клееного бруса',
              image: '../../public/catalog1.png',
              hoverImage: '../../public/catalog2.png',
              route: ROUTES.GlulamHouse,
              price: 150000,
              oldPrice: 100000,
              discount: 100,
              promotion: true,
              new: true
        },
        {
              id: 2,
              title: 'Проект 2 - Дом из клееного бруса',
              image: '../../public/catalog1.png',
              hoverImage: '../../public/catalog3.png',
              route: ROUTES.GlulamHouse,
              price: 150000,
        },
        {
              id: 3,
              title: 'Проект 3 - Дом из клееного бруса',
              image: '../../public/catalog1.png',
              hoverImage: '../../public/catalog2.png',
              route: ROUTES.GlulamHouse
        }
      ];
    

  return (
    <div className="container">
      <article className="catalog-href">
        <span className="text-main grey">Главная - Типовые проекты - Дома из клееного бруса</span>
        <h1 className='title-main'>Дома из клееного бруса</h1>
        <p>Дома из клееного бруса — это экологичный выбор для загородной жизни за разумную стоимость. Вы можете сэкономить на отделке, ведь обработанное дерево само по себе выглядит презентабельно.</p>
      </article>
      <div className="columns">
          <CatalogMenu/>
          <div className="column is-three-quarters">
              <FilterBar/>
              <div className="columns is-multiline mt-5">
                  {houseProjects.map((project, index) => (
                      <div className="column is-one-third" key={project.id}>
                          <div
                              className="card project-card"
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                          >
                              <div className="card-image">
                                  <Link to={`${ROUTES.GlulamHouse}/${project.id}`}>
                                      <figure className="image is-4by3">
                                          <img
                                              src={hoveredIndex === index ? project.hoverImage : project.image}
                                              alt={project.title}
                                              className="project-image"
                                          />
                                      </figure>
                                  </Link>
                                  <div className="tags-wrapper">
                                      {project.promotion == true ? (
                                          <span className="tag is-warning">Акция</span>
                                      ) : null}
                                      {project.new == true ? (
                                          <span className="tag is-success">Новинка</span>
                                      ) : null}
                                  </div>
                              </div>
                              <div className="card-content">
                                  <p className="project-subtitle">Дом из клееного бруса</p>
                                  <p className="project-title">{project.title}</p>
                                  <div className="project-price">
                                      {project.price ? (
                                          <span className="new-price text-main">{project.price} ₽</span>
                                      ) : null}
                                      {project.discount ? (
                                          <div className="discount">
                                              <span className="old-price text-main">{project.oldPrice} ₽</span>
                                              <span className="discount-price">- {project.discount} ₽</span>
                                          </div>
                                      ) : null}
                                  </div>
                                  <button className="button is-primary">Заказать</button>

                              </div>
                          </div>
                      </div>
                  ))}
              </div>


              <p className="mt-5 text-main grey">
                  Заказать проект дома из клееного бруса<br/>
                  <br/>Несмотря на то, что материал деревянный, дома из клееного бруса устойчивы к огню и выносят любые
                  климатические изменения. Благодаря легкости конструкции можно сэкономить на фундаменте. Деревянные
                  дома обладают внешней эстетичностью, поэтому не требуют внешней и внутренней отделки.<br/>

                  <br/>Дом из клееного бруса под ключ — это ваш способ недорого и быстро построить загородный коттедж.
                  При подготовленном фундаменте сборка дома может занять всего 2 недели. Выбирайте подходящий по цене
                  проект и закажите такой же или проектировку на основе готового дома.
              </p>
          </div>
      </div>
    </div>
  )
}

export default GlulamHouse