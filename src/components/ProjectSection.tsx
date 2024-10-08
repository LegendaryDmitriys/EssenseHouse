import React from "react";

const projects = [
    { id: 1, imgSrc: '../../public/zm-1.png', label: 'ZM-1' },
    { id: 2, imgSrc: '../../public/zm-2.png', label: 'ZM-2' },
    { id: 3, imgSrc: '../../public/zm-3.png', label: 'ZM-3' },
    { id: 4, imgSrc: '../../public/zm-1.png', label: 'ZM-1' },
    { id: 5, imgSrc: '../../public/zm-2.png', label: 'ZM-2' },
    { id: 6, imgSrc: '../../public/zm-3.png', label: 'ZM-3' },
  ];


const ProjectSection: React.FC = () => {

    return (
        <section className="section block-content">
      <div className="container">
        <h2 className="title-main">КАЖДЫЙ НАШ ПРОЕКТ УНИКАЛЕН</h2>
        <div className="columns is-multiline">
          {projects.map((project) => (
            <div className="column is-one-third" key={project.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={project.imgSrc} alt={`Project ${project.label}`} />
                    <div className="has-text-white is-overlay is-size-4 has-text-weight-bold" style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                      {project.label}
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="has-text-centered">
          <button className="button-project text-main">Посмотреть все проекты</button>
        </div>
      </div>
    </section>
    )
}

export default ProjectSection;