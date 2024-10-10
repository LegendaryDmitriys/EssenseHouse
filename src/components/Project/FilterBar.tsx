import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const MIN = 0;
const MAX = 100000;

interface FilterOption {
    label: string;
    value: string;
    type?: 'range' | 'button';
}

const filterOptions: FilterOption[] = [
    { label: 'Цена', value: 'price', type: 'range' },
    { label: 'Хит продаж', value: 'bestSeller', type: 'button' },
    { label: 'Площадь, м²', value: 'area', type: 'button' },
    { label: 'Этажей', value: 'floors', type: 'button' },
    { label: 'Количество комнат', value: 'rooms', type: 'button' },
    { label: 'Жилая площадь, м²', value: 'livingArea', type: 'button' },
    { label: 'Количество спален', value: 'bedrooms', type: 'button' },
    { label: 'Гараж', value: 'garage', type: 'button' },
    { label: 'Назначение', value: 'purpose', type: 'button' },
    { label: 'Технологии строительства', value: 'constructionTechnology', type: 'button' },
];

const FilterBar: React.FC = () => {
    const [sortOrder, setSortOrder] = useState<string>('priceAsc');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([MIN, MAX]); // Диапазон цен
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false); // Открытие/закрытие выпадающего списка для цены

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
    };

    const handleFilterClick = (filter: string) => {
        setSelectedFilters((prev) => {
            if (prev.includes(filter)) {
                return prev.filter((f) => f !== filter);
            }
            return [...prev, filter];
        });
    };

    return (
        <div className="filter-container">
            {/* Сортировка */}
            <div className="sort-by">
                <label htmlFor="sort">По цене (сначала дешевые)</label>
                <div className="select">
                    <select id="sort" value={sortOrder} onChange={handleSortChange}>
                        <option value="priceAsc">Цена ↑</option>
                        <option value="priceDesc">Цена ↓</option>
                    </select>
                </div>
            </div>

            {/* Фильтры */}
            <div className="filter-options">
                {filterOptions.map((option) => (
                    option.type === 'range' ? (
                        <div className={`dropdown ${isPriceDropdownOpen ? 'is-active' : ''}`} key={option.value}>
                            <div className="dropdown-trigger">
                                <button
                                    className="button"
                                    aria-haspopup="true"
                                    aria-controls="dropdown-menu"
                                    onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                                >
                                    <span>{option.label}</span>
                                    <span className="icon is-small">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <div className="dropdown-item">
                                        <label className="text-main">Диапазон
                                            цены:<br/> {priceRange[0]} - {priceRange[1]}</label>
                                        <Range
                                            values={priceRange}
                                            step={1000}
                                            min={MIN}
                                            max={MAX}
                                            onChange={(values) => setPriceRange(values as [number, number])}
                                            renderTrack={({props, children}) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '6px',
                                                        width: '100%',
                                                        background: getTrackBackground({
                                                            values: priceRange,
                                                            colors: ['#ccc', '#331958', '#ccc'],
                                                            min: MIN,
                                                            max: MAX,
                                                        }),
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            )}
                                            renderThumb={({props}) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '12px',
                                                        width: '12px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#331958',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                </div>
                                            )}
                                        />
                                        <button className="dropdown-btn">Показать</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            key={option.value}
                            className={`button ${selectedFilters.includes(option.value) ? 'is-active' : ''}`}
                            onClick={() => handleFilterClick(option.value)}
                        >
                            {option.label}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
