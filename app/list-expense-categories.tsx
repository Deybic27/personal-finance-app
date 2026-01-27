import { CategoriesByType } from "@/components/database/categories-by-type";


export default function ListExpenseCategoriesScreen() {
    return (
        <CategoriesByType type='expense'/>
    );
}