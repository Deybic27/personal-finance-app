import { IncomeEditForm } from "@/components/forms/income-edit-form";
import ParallaxScrollSection from "@/components/parallax-scroll-section";
import { useLocalSearchParams } from "expo-router";

export default function EditIncome(){
    const params = useLocalSearchParams<{
        id?: '';
    }>();
    return (
        <ParallaxScrollSection>
            <IncomeEditForm incomeId={Number(params.id)} />
        </ParallaxScrollSection>
    )
}