
import { ExpenseEditForm } from "@/components/forms/expense-edit-form";
import { useLocalSearchParams } from "expo-router";

export default function EditExpense(){
    const params = useLocalSearchParams<{
        id?: '';
    }>();
    return <ExpenseEditForm expenseId={Number(params.id)} />
}