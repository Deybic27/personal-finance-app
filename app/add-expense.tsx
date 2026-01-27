import { ExpenseForm } from "@/components/forms/expense-form";
import ParallaxScrollSection from "@/components/parallax-scroll-section";

export default function AddExpenseScreen() {
    return (
        <ParallaxScrollSection>
            <ExpenseForm />
        </ParallaxScrollSection>
    );
}