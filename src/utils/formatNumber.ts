export const formatNumber = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined || isNaN(Number(value))) {
        return '-';
    }

    const numValue = Number(value);

    if (numValue % 1 === 0) {
        return numValue.toFixed(0);
    }
    return numValue.toFixed(2);
};
