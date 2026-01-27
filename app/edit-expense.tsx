
import { ExpenseEditForm } from "@/components/forms/expense-edit-form";
import ParallaxScrollSection from "@/components/parallax-scroll-section";
import { useLocalSearchParams } from "expo-router";

export default function EditExpense(){
    const params = useLocalSearchParams<{
        id?: '';
    }>();
    return (
        <ParallaxScrollSection>
            <ExpenseEditForm expenseId={Number(params.id)} />
        </ParallaxScrollSection>
    )
}