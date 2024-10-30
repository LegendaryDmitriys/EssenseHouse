import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "../../redux/features/filter/filterSlice.ts";
import { Range, getTrackBackground } from 'react-range';
import {setSelectedFilters} from "../../redux/features/house/houseProjectsSlice.ts";


const FilterBar: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
    const dispatch = useDispatch();
    const { filterOptions } = useSelector((state: any) => state.filters);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [rangeValues, setRangeValues] = useState<{ [key: string]: number[] }>({});
    const [exactValues, setExactValues] = useState<{ [key: string]: number }>({});
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchFilters());
    }, [dispatch]);

    const toggleDropdown = (filterName: string) => {
        setOpenDropdown((prev) => (prev === filterName ? null : filterName));
    };

    useEffect(() => {
        const initialRangeValues: { [key: string]: number[] } = {};
        filterOptions.forEach(filter => {
            if (filter.filter_type === 'range') {
                initialRangeValues[filter.field_name] = [filter.options.min, filter.options.max];
            }
        });
        setRangeValues(initialRangeValues);
    }, [filterOptions]);


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

    const handleRangeChange = (filterName: string, values: number[]) => {
        setRangeValues((prev) => ({ ...prev, [filterName]: values }));
        dispatch(setSelectedFilters({ ...rangeValues, [filterName]: values }));
    };

    const handleExactChange = (filterName: string, value: number) => {
        setExactValues((prev) => ({ ...prev, [filterName]: value }));
        dispatch(setSelectedFilters((prev: any) => ({ ...prev, [filterName]: value })));
    };

    const sendFiltersToServer = async () => {
        const params = new URLSearchParams();

        Object.keys(rangeValues).forEach((filterKey) => {
            if (Array.isArray(rangeValues[filterKey])) {
                params.append(`${filterKey}__gte`, rangeValues[filterKey][0].toString());
                params.append(`${filterKey}__lte`, rangeValues[filterKey][1].toString());
            }
        });

        Object.keys(exactValues).forEach((filterKey) => {
            if (exactValues[filterKey] !== undefined) {
                params.append(filterKey, exactValues[filterKey].toString());
            }
        });

        onFilterChange(Object.fromEntries(params));
    };



    const renderRangeSlider = (label: string, filterName: string, min: number, max: number) => (
        <div className="dropdown-item">
            <label className="text-main">{label}:<br /> {rangeValues[filterName][0]} - {rangeValues[filterName][1]}</label>
            <Range
                values={rangeValues[filterName]}
                step={10}
                min={min}
                max={max}
                onChange={(values) => handleRangeChange(filterName, values as [number, number])}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            background: getTrackBackground({
                                values: rangeValues[filterName],
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
                    />
                )}
            />
        </div>
    );

    const renderExactSelector = (filterName: string, choices: number[]) => (
        <div>
            {choices.map((choice) => (
                <div className="dropdown-item" key={choice}>
                    <label className="text-main">
                        <input
                            type="checkbox"
                            value={choice}
                            checked={exactValues[filterName] === choice}
                            onChange={(e) => {
                                const isChecked = e.target.checked;

                                if (isChecked) {
                                    handleExactChange(filterName, choice);
                                } else {
                                    setExactValues((prev) => {
                                        const newExactValues = { ...prev };
                                        delete newExactValues[filterName];
                                        return newExactValues;
                                    });
                                    dispatch(setSelectedFilters((prev: any) => {
                                        const newSelectedFilters = { ...prev };
                                        delete newSelectedFilters[filterName];
                                        return newSelectedFilters;
                                    }));
                                }
                            }}
                        />
                        {choice}
                    </label>
                </div>
            ))}
        </div>
    );




    return (
        <div className="filter-container" ref={dropdownRef}>
            <div className="sort-by">
                <label htmlFor="sort">По цене (сначала дешевые)</label>
                <div className="select">
                    <select id="sort">
                        <option value="priceAsc">Цена ↑</option>
                        <option value="priceDesc">Цена ↓</option>
                        <option value="popularityAsc">Популярность ↑</option>
                        <option value="popularityDesc">Популярность ↓</option>
                    </select>
                </div>
            </div>
            <div className="filter-options">
                {filterOptions.map(filter => (
                    <div className={`dropdown ${openDropdown === filter.field_name ? 'is-active' : ''}`}
                         key={filter.id}>
                        <div className="dropdown-trigger">
                            <button
                                className="button"
                                aria-haspopup="true"
                                aria-controls="dropdown-menu"
                                onClick={() => toggleDropdown(filter.field_name)}
                            >
                                <span>{filter.name}</span>
                                <span className="icon is-small">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        {openDropdown === filter.field_name && (
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    {filter.filter_type === 'range' && renderRangeSlider(filter.name, filter.field_name, filter.options.min, filter.options.max)}
                                    {filter.filter_type === 'exact' && renderExactSelector(filter.field_name, filter.options.choices)}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={sendFiltersToServer} className="btn">Применить</button>
        </div>
    );
};

export default FilterBar;
