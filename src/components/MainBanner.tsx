import React from 'react';
import Header from './Header';


const MainBanner: React.FC = () => {
  return (
    <div className="banner">
        <Header/>
      <div className="banner-content">
            <img src="/../../public/banner-logo.png" alt="banner-logo" />
        <div className="details">
            <p className='design-text'>ДИЗАЙН<br/>ПЛАНИРОВКА<br/>СТРОИТЕЛЬСТВО<br/></p>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
