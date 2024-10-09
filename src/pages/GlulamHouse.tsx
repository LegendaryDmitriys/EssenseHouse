import React, {useState} from 'react'

import { Link } from 'react-router-dom';
import { ROUTES} from '../utils/routes'

const GlulamHouse: React.FC = () => {  
    const [isActive, setIsActive] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const toggleDropdown = () => {
        setIsActive(!isActive);

    }

    const houseProjects = [
        {
          id: 1,
          title: 'Проект 1 - Дом из клееного бруса',
          image: '../../public/catalog1.png',
          hoverImage: '../../public/catalog2.png', 
          route: ROUTES.GlulamHouse,
          price: 150000,
          oldPrice: 100000,
          discount: 100
        },
        {
          id: 2,
          title: 'Проект 2 - Дом из клееного бруса',
          image: '../../public/catalog1.png',
          hoverImage: '../../public/catalog3.png',
          route: ROUTES.GlulamHouse
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
      </article>
      <div className="columns">
        <aside className="column is-one-quarter">
          <nav className="panel">
            <p className="panel-heading" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              Каталог
              <span className="icon is-small" style={{ marginLeft: '10px' }}>
                <i className={`fas ${isActive ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
              </span>
            </p>
            <div className={`panel-blocks ${isActive ? '' : 'is-hidden'}`}>
              <Link className="panel-block is-active" to={ROUTES.FrameHouse}>Каркасные дома</Link>
             
              <Link className="panel-block" to={ROUTES.LogHouse}>Дома из оцилиндрованного бревна</Link>
              <Link className="panel-block" to={ROUTES.GlulamHouse}>Дома из клееного бруса</Link>
            </div>
          </nav>
        </aside>

        <div className="column is-three-quarters">
        <div className="columns is-multiline mt-5">
        {houseProjects.map((project, index) => (
          <div className="column is-one-third" key={project.id}>
            <div
              className="card project-card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="card-image">
                <Link to={project.route}>
                  <figure className="image is-4by3">
                    <img
                      src={hoveredIndex === index ? project.hoverImage : project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  </figure>
                </Link>
                <div className="tags-wrapper">
                  <span className="tag is-warning">Акция</span>
                  <span className="tag is-success">Новинка</span>
                </div>
              </div>
              <div className="card-content">
                <p className="project-subtitle">Дом из оцилиндрованного бревна</p>
                <p className="project-title">{project.title}</p>
                <div className="project-price">
                  <span className="new-price">{project.price}</span>
                  <span className="old-price">{project.oldPrice}</span>
                  <span className="discount">{project.discount}</span>
                </div>
                <button className="button is-primary">Заказать</button>
              </div>
            </div>
          </div>
        ))}
      </div>
          

          <p className="mt-5 text-main grey">
            Заказать проект дома из клееного бруса<br/>
            <br/>Несмотря на то, что материал деревянный, дома из клееного бруса устойчивы к огню и выносят любые климатические изменения. Благодаря легкости конструкции можно сэкономить на фундаменте. Деревянные дома обладают внешней эстетичностью, поэтому не требуют внешней и внутренней отделки.<br/>

            <br/>Дом из клееного бруса под ключ — это ваш способ недорого и быстро построить загородный коттедж. При подготовленном фундаменте сборка дома может занять всего 2 недели. Выбирайте подходящий по цене проект и закажите такой же или проектировку на основе готового дома.
          </p>
        </div>
      </div>
    </div>
    )
}

export default GlulamHouse