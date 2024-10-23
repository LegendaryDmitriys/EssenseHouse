import React from 'react';
import Skeleton from "react-loading-skeleton";


const ProjectDetailSkeleton: React.FC = () => {
    return (
        <div className="container">
            <div className="breadcrumbs">
                <Skeleton width={"50%"} height={30}/>
            </div>

            <section className="main-image-section">
                <Skeleton height={900}/>
                <div className="house-info">
                    <div className="section-house__title title-main white">
                        <Skeleton count={1} height={40}/>
                    </div>
                    <div className="block-special text-main white">
                        {Array.from({length: 3}).map((_, index) => (
                            <div className="block-special__item" key={index}>
                                <Skeleton count={2} height={20}/>
                            </div>
                        ))}
                        <a href="#characteristics" className="block-special__item">
                            <Skeleton count={1} height={20} width={30}/>
                        </a>
                    </div>
                </div>
            </section>

            <section className="info-house">
                <div className="info-house__content">
                    <section className="gallery-section">
                        {Array.from({length: 6}).map((_, index) => (
                            <div key={index} className="gallery-item">
                                <Skeleton height={300}/>
                            </div>
                        ))}
                    </section>

                    <section className="tizer-block">
                        <div className="tizer-list">
                            {Array.from({length: 3}).map((_, index) => (
                                <div className="tizer-list__item" key={index}>
                                    <Skeleton height={60} width={60} style={{borderRadius: '50%'}}/>
                                    <h4>
                                        <Skeleton count={1} width={100}/>
                                    </h4>
                                    <Skeleton count={1} width={200}/>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="house-nav">
                        <nav>
                            <ul className='tabs-nav text-main'>
                                {Array.from({length: 4}).map((_, index) => (
                                    <li key={index} className={index === 0 ? 'active' : ''}>
                                        <Skeleton width={100}/>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>

                    <section className='characteristics-block all-section'>
                        <h2 className='characteristics-title'>
                            <Skeleton width={200}/>
                        </h2>
                        <div className='characteristics-info title-main '>
                            <table>
                                <tbody>
                                {Array.from({length: 8}).map((_, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Skeleton width={150}/>
                                        </td>
                                        <td>
                                            <Skeleton width={100}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className='description-block all-section'>
                        <h2 className='description-title'>
                            <Skeleton width={200}/>
                        </h2>
                        <Skeleton count={5}/>
                    </section>

                    <section className="finishing-block all-section">
                        <h2 className='tariff-title'>
                            <Skeleton width={200}/>
                        </h2>
                        <div className='tarrif-list'>
                            {Array.from({length: 3}).map((_, index) => (
                                <div key={index} className='tarrif-list__item'>
                                    <Skeleton height={100}/>
                                    <Skeleton height={20}/>
                                    <Skeleton width={100}/>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="documents-block all-section">
                        <h2 className='documents-title'>
                            <Skeleton width={200}/>
                        </h2>
                        <div className='documents-list'>
                            {Array.from({length: 3}).map((_, index) => (
                                <div key={index} className='documents-list__item'>
                                    <Skeleton height={30} width={150}/>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="price-section">
                    <Skeleton height={40} width={200} style={{marginBottom: '10px'}}/>
                    <Skeleton height={30} width={100}/>

                    <button className="order-button" style={{background:"transparent"}}>
                        <Skeleton width={100}/>
                    </button>

                    <div className="info-buttons">
                        <Skeleton height={30} width={150}/>
                        <Skeleton height={30} width={50}/>
                    </div>
                    <p className="guarantee-info">
                        <Skeleton count={1}/>
                    </p>
                </div>
            </section>
        </div>
    )
}

export default ProjectDetailSkeleton