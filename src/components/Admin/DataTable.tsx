import React, {useState } from "react";
import CategoriesTable from "./table/CategoriesTable.tsx";
import HousesTable from "./table/HousesTable.tsx";
import Sidebar from "./Sidebar.tsx";
import FinishingOptionsTable from "./table/FinishingOptionsTable.tsx";
import FilterOptionsTable from "./table/FilterOptionsTable.tsx";



const DataTable: React.FC = () => {
    const [currentTable, setCurrentTable] = useState<'houses' | 'categories' | 'finishingOptions' | 'filterOptions'>('houses');


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
                <div className="table-header">
                    <h3 className="subtitle">
                        {currentTable === 'houses' && 'Таблица домов'}
                        {currentTable === 'categories' && 'Таблица категорий'}
                        {currentTable === 'finishingOptions' && 'Таблица вариантов отделки'}
                        {currentTable === 'filterOptions' && 'Таблица фильтров'}

                        <div style={{ display: "inline-flex", marginLeft: "10px" }}>
                            {currentTable !== 'houses' && (
                                <button
                                    className="button is-small is-white"
                                    onClick={goToPreviousTable}
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                            )}
                            {currentTable !== 'filterOptions' && (
                                <button
                                    className="button is-small is-white"
                                    onClick={goToNextTable}
                                    style={{ marginLeft: "5px" }}
                                >
                                    <i className="fa fa-arrow-right"></i>
                                </button>
                            )}
                        </div>
                    </h3>
                </div>
                    <>
                        {currentTable === 'houses' && <HousesTable />}
                        {currentTable === 'categories' && <CategoriesTable />}
                        {currentTable === 'finishingOptions' && <FinishingOptionsTable  />}
                        {currentTable === 'filterOptions' && <FilterOptionsTable  />}
                    </>
            </main>
        </div>
    );
};

export default DataTable;
