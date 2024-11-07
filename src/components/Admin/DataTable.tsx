import React, { useEffect, useState } from "react";
import CategoriesTable from "./table/CategoriesTable.tsx";
import HousesTable from "./table/HousesTable.tsx";
import Sidebar from "./Sidebar.tsx";
import config from "../../api/api.ts";
import axios from "axios";
import { HouseProject } from "../../redux/features/house/houseProjectsSlice.ts";
import FinishingOptionsTable from "./table/FinishingOptionsTable.tsx";
import FilterOptionsTable from "./table/FilterOptionsTable.tsx";
import {FilterOption} from "../../redux/features/filter/filterSlice.ts";

interface FinishingOption {
    id: number;
    title: string;
    description: string;
    price_per_sqm: string;
    image: string | null;
}

const DataTable: React.FC = () => {
    const [houses, setHouses] = useState<HouseProject[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [finishingOptions, setFinishingOptions] = useState<FinishingOption[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTable, setCurrentTable] = useState<'houses' | 'categories' | 'finishingOptions' | 'filterOptions'>('houses');

    const fetchHouses = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get<HouseProject[]>(`${config.API_URL}houses/`);
            setHouses(response.data);
        } catch {
            setError('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get<{ id: number; name: string }[]>(`${config.API_URL}category/`);
            setCategories(response.data);
        } catch  {
            setError('Ошибка загрузки категорий');
        }
    };

    const fetchFinishingOptions = async () => {
        try {
            const response = await axios.get<FinishingOption[]>(`${config.API_URL}finishing-options/`);
            setFinishingOptions(response.data);
        } catch {
            setError('Ошибка загрузки вариантов отделки');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFilterOptions = async () => {
        try {
            const response = await axios.get(`${config.API_URL}filter-options/`);
            setFilterOptions(response.data);
        } catch {
            setError('Ошибка загрузки фильтров');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHouses();
        fetchCategories();
        fetchFinishingOptions();
        fetchFilterOptions();
    }, []);

    const goToNextTable = () => {
        if (currentTable === 'houses') {
            setCurrentTable('categories');
        } else if (currentTable === 'categories') {
            setCurrentTable('finishingOptions');
        } else if (currentTable === 'finishingOptions') {
            setCurrentTable('filterOptions');
        }
    };

    const goToPreviousTable = () => {
        if (currentTable === 'filterOptions') {
            setCurrentTable('finishingOptions');
        } else if (currentTable === 'finishingOptions') {
            setCurrentTable('categories');
        } else if (currentTable === 'categories') {
            setCurrentTable('houses');
        }
    };



    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <h2 className="subtitle-main">Таблица данных</h2>
                {error && <div className="notification is-danger">{error}</div>}
                <div className="table-header">
                    <h3>
                        {currentTable === 'houses' && 'Таблица домов'}
                        {currentTable === 'categories' && 'Таблица категорий'}
                        {currentTable === 'finishingOptions' && 'Таблица вариантов отделки'}
                        {currentTable === 'filterOptions' && 'Таблица фильтров'}

                        <div style={{ display: "inline-flex", marginLeft: "10px" }}>
                            {currentTable !== 'houses' && (
                                <button
                                    className="button is-small is-info"
                                    onClick={goToPreviousTable}
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                            )}
                            {currentTable !== 'filterOptions' && (
                                <button
                                    className="button is-small is-info"
                                    onClick={goToNextTable}
                                    style={{ marginLeft: "5px" }}
                                >
                                    <i className="fa fa-arrow-right"></i>
                                </button>
                            )}
                        </div>
                    </h3>
                </div>

                {isLoading ? (
                    <div>Загрузка данных...</div>
                ) : (
                    <>
                        {currentTable === 'houses' && <HousesTable houses={houses} />}
                        {currentTable === 'categories' && <CategoriesTable categories={categories} />}
                        {currentTable === 'finishingOptions' && <FinishingOptionsTable finishingOptions={finishingOptions} />}
                        {currentTable === 'filterOptions' && <FilterOptionsTable filterOptions={filterOptions} />}
                    </>
                )}
            </main>
        </div>
    );
};

export default DataTable;
