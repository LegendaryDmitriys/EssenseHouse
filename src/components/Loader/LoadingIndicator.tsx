import React from 'react';
import '../../styles/loading.css'

const LoadingIndicator: React.FC = () => {
    return (
        <div className="loading-indicator">
            <span className="loader"></span>
        </div>
    );
};

export default LoadingIndicator;