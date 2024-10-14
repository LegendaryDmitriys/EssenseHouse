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
            <div>
                {!showOfficeMap ? (
                    <div className='map-info__box'>
                        <h2 className='map-subtitle'>РАБОТАЕМ ПО ВСЕЙ НОВГОРОДСКОЙ ОБЛАСТИ</h2>
                        <p className='text-main grey'>
                            Мы предоставляем полный спектр услуг по строительству домов под ключ: от проектирования
                            и
                            согласования всех необходимых документов до возведения фундамента и завершения
                            отделочных
                            работ.
                        </p>
                    </div>
                ) : (
                    <div className='oficce-info'>
                        <h2 className='subtitle-main'>ПОСЕТИТЕ НАШ ОФИС</h2>
                        <p className='text-main grey'>
                            Приглашаем вас в наш офис, расположенный по адресу: г. Великий Новгород, площадь Победы-Софийская, 1. <br/>Здесь вы можете получить детальную консультацию по вашему проекту, обсудить условия сотрудничества и ознакомиться с нашими услугами.<br/>

                            <br/>Мы предоставляем консультации как по телефону, так и лично в офисе. Если у вас возникли вопросы, не стесняйтесь обращаться.
                        </p>
                    </div>
                )}
            </div>
            {!showOfficeMap ? (
                <RussiaMap onRegionClick={handleRegionClick}/>
            ) : (
                <OfficeMap/>
            )}
        </div>
    );
};

export default ContactsPage;
