import { CategoryEditForm } from "@/components/forms/category-edit-form";
import { useLocalSearchParams } from "expo-router";

export default function EditCategory(){
    const params = useLocalSearchParams<{
        id?: '';
    }>();
    return <CategoryEditForm categoryId={Number(params.id)} />
}