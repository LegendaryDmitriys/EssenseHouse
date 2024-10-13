import React, {useState} from "react";
import RussiaMap from '../components/Contacts/RussiaMap.tsx';
import OfficeMap from "../components/Contacts/OfficeMap.tsx";


const ContactsPage: React.FC = () => {
    const [showOfficeMap, setShowOfficeMap] = useState(false);

    const handleRegionClick = () => {
        setTimeout(() => {
            setShowOfficeMap(true);
        }, 1000);
    };

    return (
        <div className='container'>
            <h1 className='subtitle-main'>Контакты</h1>
            <div className='map-info__box'>
                <h2 className='map-subtitle'>РАБОТАЕМ ПО ВСЕЙ НОВГОРОДСКОЙ ОБЛАСТИ</h2>
                <p className='text-main grey'>Мы предоставляем полный спектр услуг по строительству домов под ключ: от проектирования и согласования всех необходимых документов до возведения фундамента и завершения отделочных работ.</p>
            </div>
            {!showOfficeMap ? (
                <RussiaMap onRegionClick={handleRegionClick} />
            ) : (
                <OfficeMap />
            )}
        </div>
    );
};

export default ContactsPage;
