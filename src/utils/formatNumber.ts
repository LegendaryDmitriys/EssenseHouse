export const formatNumber = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined || isNaN(Number(value))) {
        return '-'; // Возвращаем дефолтное значение, если число не передано
    }

    const numValue = Number(value); // Преобразуем к числу

    if (numValue % 1 === 0) {
        return numValue.toFixed(0); // Округление до целого числа
    }
    return numValue.toFixed(2); // Форматирование до двух знаков после запятой
};
