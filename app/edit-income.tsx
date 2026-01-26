import { IncomeEditForm } from "@/components/forms/income-edit-form";
import { useLocalSearchParams } from "expo-router";

export default function EditIncome(){
    const params = useLocalSearchParams<{
        id?: '';
    }>();
    return <IncomeEditForm incomeId={Number(params.id)} />
}