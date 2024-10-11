import React, {useState} from 'react';

import { Link} from "react-router-dom";
// @ts-ignore
import { ROUTES} from '../utils/routes'
import FilterBar from "../components/Project/FilterBar.tsx";
import CatalogMenu from "../components/Project/CatalogMenu.tsx";

const FrameHouse: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const houseProjects = [
        {
          id: 1,
          title: 'Проект 1 - Каркасный дом',
          image: '../../public/catalog1.png',
          hoverImage: '../../public/catalog2.png',
          route: ROUTES.GlulamHouse,
          price:10000,
          oldPrice: 100000,
          discount: 5000,
          promotion: true,
          new: true
        },
        {
          id: 2,
          title: 'Проект 2 - Каркасный дом',
          image: '../../public/catalog2.png',
          hoverImage: '../../public/catalog3.png',
          route: ROUTES.GlulamHouse,
          price:100000,
        },
        {
          id: 3,
          title: 'Проект 3 - Каркасный дом',
          image: '../../public/catalog3.png',
          hoverImage: '../../public/catalog2.png',
          route: ROUTES.GlulamHouse,
          price:500000,
        }
      ];

  return (
      <div className="container">
          <article className="catalog-href">
              <span className="text-main grey">Главная - Типовые проекты - Каркасные дома</span>
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
                                      <Link to={`${ROUTES.FrameHouse}/${project.id}`}>
                                          <figure className="image is-4by3">
                                              <img
                                                  src={hoveredIndex === index ? project.hoverImage : project.image}
                                                  alt={project.title}
                                                  className="project-image"
                                              />
                                          </figure>
                                      </Link>
                                      <div className="tags-wrapper">
                                          {project.promotion && (
                                              <span className="tag is-warning">Акция</span>
                                          )}
                                          {project.new && (
                                              <span className="tag is-success">Новинка</span>
                                          )}
                                      </div>
                                  </div>
                                  <div className="card-content">
                                      <p className="project-subtitle">Каркасный дом</p>
                                      <p className="project-title">{project.title}</p>
                                      <div className="project-price">
                                          {project.price && (
                                              <span className="new-price text-main">{project.price} ₽</span>
                                          )}
                                          {project.discount && (
                                              <div className="discount">
                                                  <span className="old-price text-main">{project.oldPrice} ₽</span>
                                                  <span className="discount-price">- {project.discount} ₽</span>
                                              </div>
                                          )}
                                      </div>
                                      <button className="button is-primary">Заказать</button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  <p className="mt-5 text-main grey">
                      Вы можете заказать проект каркасного дома из нашего каталога и сразу же получить смету
                      строительства.<br/>
                      <br/>Каркасные дома прекрасно сохраняют тепло. Материал экологичен и соответствует санитарным
                      нормам. Также дом не деформируется при любых погодных условиях. Каркасные конструкции легкие,
                      поэтому дома по этой технологии возводятся на мелкозаглубленных или свайных фундаментах. Фундамент
                      требует небольших затрат.<br/>
                      <br/>Закажите проект каркасного дома под ключ, чтобы вырваться из большого шумного города. Теплые
                      стены и крепкий каркас отлично подойдут для проживания вашей семьи.
                  </p>
              </div>
          </div>
      </div>
  );
};

export default FrameHouse;
