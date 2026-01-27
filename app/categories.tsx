import { CategoriesByType } from "@/components/database/categories-by-type";
import { useLocalSearchParams } from "expo-router";


export default function CategoriesScreen() {
    const params = useLocalSearchParams<{
        type?: 'income' | 'expense';
    }>();
    return (
        <CategoriesByType type={String(params.type)} />   
    );
}