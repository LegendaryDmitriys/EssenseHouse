import { useEffect, useState } from 'react';
import axios from 'axios';


interface HouseCategory {
    id: number;
    name: string;
}

const useHouseCategories = () => {
    const [categories, setCategories] = useState<HouseCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get<HouseCategory[]>('http://192.168.0.103:8000/category/');
                setCategories(response.data);
            } catch (err) {
                setError('Ошибка при загрузке категорий');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export default useHouseCategories;
