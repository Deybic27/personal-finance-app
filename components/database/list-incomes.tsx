import { getIncomesWithCategory } from "@/database/db";
import { formatDate } from "@/utils/date";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { ThemedContainer } from "../themed-container";
import { ThemedPressable } from "../themed-pressable";
import { ThemedSection } from "../themed-section";
import { ThemedSectionContainer } from "../themed-section-container";
import { ThemedText } from "../themed-text";
import { IncomeCard } from "../ui/income-card";

type Incomes = {
    id: number;
    categoryColor: string;
    categoryName: string;
    amount: number;
    date: string;
    note: string;
}

export function ListIncomes() {
    const [incomes, setIncomes] = useState<Incomes[]>([])

    useFocusEffect(
        useCallback(() => {
            setIncomes(getIncomesWithCategory());
        }, [])
    );

    return (
        <ThemedContainer>
            <FlatList
                data={incomes}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <ThemedSectionContainer>
                            <ThemedPressable onPress={() => router.push({pathname: '/edit-income', params: {id: item.id}})}>
                                <ThemedSection>
                                    <IncomeCard 
                                        colorCategory={item.categoryColor}
                                        nameCategory={item.categoryName}
                                        amount={item.amount}
                                        date={formatDate(item.date)}
                                        note={item.note}
                                    />
                                </ThemedSection>
                            </ThemedPressable>
                        </ThemedSectionContainer>
                    );
                }}
            />
            <ThemedPressable type="floatButton" onPress={() => router.push('/add-income')}>
                <ThemedText>+</ThemedText>
            </ThemedPressable>
        </ThemedContainer>
    );
}