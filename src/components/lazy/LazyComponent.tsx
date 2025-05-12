import React, { useRef } from "react";
import { useInView } from "framer-motion";

interface LazyComponentProps {
    children: React.ReactNode;
}

const LazyComponent = ({ children }: LazyComponentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref}>
            {isInView ? children : null}
        </div>
    );
};

export default LazyComponent;