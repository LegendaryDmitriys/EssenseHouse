import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {latLng} from "leaflet";

const OfficeMap: React.FC = () => {
    const officePosition = latLng(58.5228, 31.2690);

    return (
        <MapContainer center={officePosition} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={officePosition}>
                <Popup>
                    <div className='oficce-block__info'>
                        <p>г. Великий Новгород, площадь Победы-Софийская, 1</p>
                        <article className='oficce-block__time'>
                            <span className='oficce-headers'>Режим работы</span>
                            <p className='oficce-text' >Пн - Пт: 08:00 - 19:00</p>
                        </article>
                        <article>
                            <span className='oficce-headers'>Телефон</span>
                            <p className='oficce-text'>+7 (000) 000-00-00</p>
                        </article>
                        <article>
                            <span className='oficce-headers'>E-mail</span>
                            <p className='oficce-text' >mail@.ru</p>
                        </article>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default OfficeMap;
