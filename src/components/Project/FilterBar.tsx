import React, { useState, useEffect, useRef } from 'react';
import { Range, getTrackBackground } from 'react-range';

const MIN = 0;
const MAX = 100000;
const AREA_MIN = 50;
const AREA_MAX = 300;
const LIVING_AREA_MIN = 30;
const LIVING_AREA_MAX = 200;

interface FilterOption {
    label: string;
    value: string;
    options?: string[];
    type?: 'range' | 'dropdown';
    min?: number;
    max?: number;
}

const filterOptions: FilterOption[] = [
    { label: 'Цена', value: 'price', type: 'range', min: MIN, max: MAX },
    { label: 'Хит продаж', value: 'bestSeller', type: 'dropdown', options: ['Акция', 'Новинка'] },
    { label: 'Площадь, м²', value: 'area', type: 'range', min: AREA_MIN, max: AREA_MAX },
    { label: 'Этажей', value: 'floors', type: 'dropdown', options: ['1', '2', '3', '4', '5'] },
    { label: 'Количество комнат', value: 'rooms', type: 'dropdown', options: ['1', '2', '3', '4'] },
    { label: 'Жилая площадь, м²', value: 'livingArea', type: 'range', min: LIVING_AREA_MIN, max: LIVING_AREA_MAX },
    { label: 'Количество спален', value: 'bedrooms', type: 'dropdown', options: ['1', '2', '3', '4'] },
    { label: 'Гараж', value: 'garage', type: 'dropdown', options: ['Да', 'Нет'] },
    { label: 'Назначение', value: 'purpose', type: 'dropdown', options: ['Частный дом', 'Коммерческая недвижимость'] },
    { label: 'Технологии строительства', value: 'constructionTechnology', type: 'dropdown', options: ['Каркасная', 'Кирпичная', 'Монолитная'] },
];

const FilterBar: React.FC = () => {
    const [sortOrder, setSortOrder] = useState<string>('priceAsc');
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [priceRange, setPriceRange] = useState<[number, number]>([MIN, MAX]);
    const [areaRange, setAreaRange] = useState<[number, number]>([AREA_MIN, AREA_MAX]);
    const [livingAreaRange, setLivingAreaRange] = useState<[number, number]>([LIVING_AREA_MIN, LIVING_AREA_MAX]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
    };

    const toggleDropdown = (filter: string) => {
        setOpenDropdown((prev) => (prev === filter ? null : filter));
    };

    const handleFilterChange = (filter: string, option: string) => {
        setSelectedFilters((prev) => {
            const prevSelected = prev[filter] || [];
            if (prevSelected.includes(option)) {
                return { ...prev, [filter]: prevSelected.filter((o) => o !== option) };
            }
            return { ...prev, [filter]: [...prevSelected, option] };
        });
    };

    const getSelectedLabel = (filter: string, defaultLabel: string) => {
        const selected = selectedFilters[filter];
        if (!selected || selected.length === 0) return defaultLabel;
        return `${defaultLabel}: ${selected.length}`;
    };

    const isActive = (filter: string) => {
        return selectedFilters[filter] && selectedFilters[filter].length > 0;
    };

    const renderRangeSlider = (label: string, range: [number, number], setRange: React.Dispatch<React.SetStateAction<[number, number]>>, min: number, max: number) => (
        <div className="dropdown-item">
            <label className="text-main">{label}:<br /> {range[0]} - {range[1]}</label>
            <Range
                values={range}
                step={10}
                min={min}
                max={max}
                onChange={(values) => setRange(values as [number, number])}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            background: getTrackBackground({
                                values: range,
                                colors: ['#ccc', '#331958', '#ccc'],
                                min: min,
                                max: max,
                            }),
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
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
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = dropdownRef.current;
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="filter-container" ref={dropdownRef}>
            <div className="sort-by">
                <label htmlFor="sort">По цене (сначала дешевые)</label>
                <div className="select">
                    <select id="sort" value={sortOrder} onChange={handleSortChange}>
                        <option value="priceAsc">Цена ↑</option>
                        <option value="priceDesc">Цена ↓</option>
                        <option value="popularityAsc">Популярность ↑</option>
                        <option value="popularityDesc">Популярность ↓</option>
                    </select>
                </div>
            </div>
            <div className="filter-options">
                {filterOptions.map((option) => (
                    option.type === 'range' ? (
                        <div className={`dropdown ${openDropdown === option.value ? 'is-active' : ''}`}
                             key={option.value}>
                            <div className="dropdown-trigger">
                                <button
                                    className="button"
                                    aria-haspopup="true"
                                    aria-controls="dropdown-menu"
                                    onClick={() => toggleDropdown(option.value)}
                                >
                                    <span>{option.label}</span>
                                    <span className="icon is-small">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    {option.value === 'price' && renderRangeSlider('Диапазон цены', priceRange, setPriceRange, option.min!, option.max!)}
                                    {option.value === 'area' && renderRangeSlider('Площадь, м²', areaRange, setAreaRange, option.min!, option.max!)}
                                    {option.value === 'livingArea' && renderRangeSlider('Жилая площадь, м²', livingAreaRange, setLivingAreaRange, option.min!, option.max!)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`dropdown ${openDropdown === option.value ? 'is-active' : ''}`} key={option.value}>
                            <div className="dropdown-trigger">
                                <button
                                    className={`button ${isActive(option.value) ? 'is-active-filter' : ''}`}
                                    aria-haspopup="true"
                                    aria-controls="dropdown-menu"
                                    onClick={() => toggleDropdown(option.value)}
                                >
                                    <span>{getSelectedLabel(option.value, option.label)}</span>
                                    <span className="icon is-small">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    {option.options?.map((opt) => (
                                        <div className="dropdown-item" key={opt}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters[option.value]?.includes(opt) || false}
                                                    onChange={() => handleFilterChange(option.value, opt)}
                                                />
                                                {opt}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default FilterBar;