import React from 'react';
import Skeleton from "react-loading-skeleton";

const CompletedProjectSkeleton: React.FC = () => {
    return (
        <div className="container">
            <h1 className="title-main">ГОТОВЫЕ ДОМА</h1>
            <div className="completed-house__map">

            </div>
            <div className="line-block">
                <p>Готовые дома</p>
            </div>
            <div className="completed-house">
                <div className="columns is-multiline">
                        <div className="card-white card-margin" >
                            {[1, 2, 3].map((_, index) => (
                                <div className="card-image" key={index}>
                                    <Skeleton height={200}/>
                                    <div
                                        className="has-text-white is-size-4 has-text-weight-bold"
                                        style={{position: 'absolute', bottom: '10px', left: '10px'}}
                                    >
                                        <Skeleton height={20} width="60%" style={{marginTop: '10px'}}/>
                                        <Skeleton height={20} width="40%" style={{marginTop: '10px'}}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CompletedProjectSkeleton;