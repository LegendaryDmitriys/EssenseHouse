import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import {latLng} from "leaflet";

interface UserCompletedHouseMapProps {
    purchases: {
        id: number;
        house: {
            id: number;
            title: string;
            images: { id: number; image: string }[];
            area: number;
        };
        latitude: number;
        longitude: number;
    }[];
}

const UserCompletedHouseMap: React.FC<UserCompletedHouseMapProps> = ({ purchases }) => {
    const NovgorodPosition = latLng(58.5228, 31.2690);

    return (
        <MapContainer center={NovgorodPosition} zoom={8} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            {purchases.length > 0 ? (
                purchases.map((purchase) => (
                    <Marker key={purchase.id} position={[purchase.latitude, purchase.longitude]}>
                        <Popup>
                            <Link to={`${ROUTES.ProjectDetail.replace(':id', purchase.house.id.toString())}`}>
                                <div className='completedet-block__info'>
                                    <div className='completedet-img'>
                                        {purchase.house.images.length > 0 ? (
                                            <img
                                                src={purchase.house.images[0].image}
                                                alt={`Project ${purchase.house.title}`}
                                                style={{ width: '300px', height: '120px' }}
                                            />
                                        ) : (
                                            <img
                                                src="/house.jpg"
                                                alt={`Project ${purchase.house.title}`}
                                                style={{width: '300px', height: '110px'}}
                                            />
                                        )}
                                    </div>
                                    <article>
                                        <h3>Готовые дома</h3>
                                        <p>{purchase.house.title}, {purchase.house.area} м²</p>
                                    </article>
                                </div>
                            </Link>
                        </Popup>
                    </Marker>
                ))
            ) : (
                <div className="no-data-message">Нет доступных данных о завершенных домах.</div>
            )}
        </MapContainer>
    );
};

export default UserCompletedHouseMap;
