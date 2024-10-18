import {useRef, useState } from "react";

export const useFullScreen = () => {
    const elementRef = useRef<HTMLImageElement | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const openFullScreenModal = () => {
        setIsFullScreen(true);
    };

    const closeFullScreenModal = () => {
        setIsFullScreen(false);
    };


    return {
        elementRef,
        isFullScreen,
        openFullScreenModal,
        closeFullScreenModal,
        setIsFullScreen
    };
};
