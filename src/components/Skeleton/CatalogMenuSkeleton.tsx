import React from "react";
import Skeleton from "react-loading-skeleton";

const CatalogMenuSkeleton: React.FC = () => {
    return (
        <>
            <nav className="panel">
                <Skeleton height={60} width={`100%`}/>
            </nav>
        </>
    )
}

export default CatalogMenuSkeleton