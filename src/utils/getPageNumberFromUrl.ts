export const getPageNumberFromUrl = (url: string | null): number => {
    if (!url) return 1;
    try {
        const urlObj = new URL(url);
        const pageParam = urlObj.searchParams.get('page');
        return parseInt(pageParam || '1', 10);
    } catch (e) {
        return 1;
    }
};