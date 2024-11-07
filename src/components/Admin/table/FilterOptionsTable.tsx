import React from "react";
import {FilterOption} from "../../../redux/features/filter/filterSlice.ts";

const FilterOptionsTable: React.FC<{ filterOptions: FilterOption[] }> = ({ filterOptions }) => {
    return (
        <table className="table is-fullwidth is-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название фильтра</th>
                <th>Тип фильтра</th>
                <th>Опции</th>
            </tr>
            </thead>
            <tbody>
            {filterOptions.map((filter) => (
                <tr key={filter.id}>
                    <td>{filter.id}</td>
                    <td>{filter.name}</td>
                    <td>{filter.filter_type}</td>
                    <td>
                        {filter.filter_type === "range" ? (
                            <>
                                <strong>Минимум:</strong> {filter.options?.min}, <strong>Максимум:</strong> {filter.options?.max}
                            </>
                        ) : (
                            <pre>{JSON.stringify(filter.options)}</pre>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default FilterOptionsTable;
