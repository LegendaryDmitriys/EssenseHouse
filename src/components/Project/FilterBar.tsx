import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "../../redux/features/filter/filterSlice.ts";
import { Range, getTrackBackground } from 'react-range';
import {setSelectedFilters} from "../../redux/features/house/houseProjectsSlice.ts";
import {AppDispatch, RootState} from "../../redux/store.ts";


const FilterBar: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { filterOptions } = useSelector((state: RootState) => state.filters);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [rangeValues, setRangeValues] = useState<{ [key: string]: number[] }>({});
    const [defaultRangeValues, setDefaultRangeValues] = useState<{ [key: string]: number[] }>({});
    const [exactValues, setExactValues] = useState<{ [key: string]: number }>({});
    const [defaultExactValues, setDefaultExactValues] = useState<{ [key: string]: number }>({});
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [sortValue, setSortValue] = useState<string>('priceAsc');

    useEffect(() => {
        dispatch(fetchFilters());
    }, [dispatch]);

    const toggleDropdown = (filterName: string) => {
        setOpenDropdown((prev) => (prev === filterName ? null : filterName));
    };

    useEffect(() => {
        const initialRangeValues: { [key: string]: number[] } = {};
        const defaultRangeVals: { [key: string]: number[] } = {};
        const exactVals: { [key: string]: number } = {};
        const defaultExactVals: { [key: string]: number } = {};

        filterOptions.forEach(filter => {
            if (filter.filter_type === 'range') {
                const min = filter.options?.min ?? 0;
                const max = filter.options?.max ?? 0;
                const range: number[] = [min, max];
                initialRangeValues[filter.field_name] = range;
                defaultRangeVals[filter.field_name] = range;
            } else if (filter.filter_type === 'exact') {
                exactVals[filter.field_name] = filter.options?.default ?? 0;
                defaultExactVals[filter.field_name] = filter.options?.default ?? 0;
            }
        });

        setRangeValues(initialRangeValues);
        setDefaultRangeValues(defaultRangeVals);
        setExactValues(exactVals);
        setDefaultExactValues(defaultExactVals);
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

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortValue = event.target.value;
        setSortValue(newSortValue);
        onFilterChange({ sort: newSortValue });
    };

    const sendFiltersToServer = async () => {
        const params = new URLSearchParams();

        Object.keys(rangeValues).forEach((filterKey) => {
            const defaultRange = defaultRangeValues[filterKey];
            const currentRange = rangeValues[filterKey];

            if (Array.isArray(currentRange) && (currentRange[0] !== defaultRange[0] || currentRange[1] !== defaultRange[1])) {
                params.append(`${filterKey}__gte`, currentRange[0].toString());
                params.append(`${filterKey}__lte`, currentRange[1].toString());
            }
        });

        Object.keys(exactValues).forEach((filterKey) => {
            const defaultExactValue = defaultExactValues[filterKey];
            const currentExactValue = exactValues[filterKey];

            if (currentExactValue !== defaultExactValue) {
                params.append(filterKey, currentExactValue.toString());
            }
        });

        if (sortValue) {
            params.append("sort", sortValue);
        }

        if (params.toString()) {
            onFilterChange(Object.fromEntries(params));
        }
    };

    const resetFilters = () => {
        setRangeValues(defaultRangeValues);
        setExactValues(defaultExactValues);

        dispatch(setSelectedFilters({}));

        onFilterChange({});
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
                <div className="select text-main">
                    <select id="sort" value={sortValue} onChange={handleSortChange}>
                        <option value="priceAsc">По цене (сначала дешевые)</option>
                        <option value="priceDesc">По цене (сначала дорогие)</option>
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
                                    {filter.filter_type === 'range' && filter.options && renderRangeSlider(
                                        filter.name,
                                        filter.field_name,
                                        filter.options.min ?? 0,
                                        filter.options.max ?? 0
                                    )}
                                    {filter.filter_type === 'exact' && filter.options && renderExactSelector(
                                        filter.field_name,
                                        filter.options.choices ?? []
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={sendFiltersToServer} className="btn-filter__post">Применить</button>
                <button onClick={resetFilters} className="btn-filter__delete">Очистить</button>
            </div>
        </div>
    );
};

export default FilterBar;
