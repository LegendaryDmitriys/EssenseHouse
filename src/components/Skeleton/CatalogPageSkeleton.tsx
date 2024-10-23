import React from "react";
import Skeleton from "react-loading-skeleton";

import CatalogMenuSkeleton from "./CatalogMenuSkeleton.tsx";

const CatalogPageSkeleton: React.FC = () => {
    return (
        <div className="container">
            <article className="catalog-href">
                <span className="text-main grey"><Skeleton width="35%" count={1} height={40} /></span>
                <h1 className='title-main skeleton-text'><Skeleton width="40%" count={1} height={40} /></h1>
                <p className="skeleton-text"><Skeleton width="100%" count={2} height={20} /></p>
            </article>

            <div className="columns">
                <aside className="column is-one-quarter">
                    <CatalogMenuSkeleton/>
                </aside>
                <div className="column is-three-quarters">
                    <Skeleton count={5} height={40} style={{marginBottom: '10px'}}/>
                    <div className="columns is-multiline mt-5">
                        {[1, 2, 3].map((_, index) => (
                            <div className="column is-one-third" key={index}>
                                <Skeleton height={200}/>
                                <div className="card-content">
                                    <Skeleton height={20} width="80%"/>
                                    <Skeleton height={20} width="60%" style={{marginTop: '10px'}}/>
                                    <Skeleton height={20} width="40%" style={{marginTop: '10px'}}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Skeleton width="100%" count={5} height={20}/>
                </div>
            </div>
        </div>
    )
}

export default CatalogPageSkeleton;