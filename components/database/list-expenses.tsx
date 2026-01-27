import { getExpensesWithCategory } from "@/database/db";
import { formatDate } from "@/utils/date";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { ThemedContainer } from "../themed-container";
import { ThemedPressable } from "../themed-pressable";
import { ThemedSection } from "../themed-section";
import { ThemedSectionContainer } from "../themed-section-container";
import { ThemedText } from "../themed-text";
import { ExpenseCard } from "../ui/expense-card";

type Expenses = {
    id: number;
    categoryColor: string;
    categoryName: string;
    amount: number;
    date:string;
    note: string;
}

export function ListExpenses() {
    const [expenses, setExpenses] = useState<Expenses[]>([])

    useFocusEffect(
        useCallback(() => {
            try {
                setExpenses(getExpensesWithCategory());
            } catch(error) {
                console.error("Error loading list expenses", error);
                return;
            }
        }, [])
    );
    return (
        <ThemedContainer>
            <FlatList
                data={expenses}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    // const date = new Date(item.date).toISOString().split('T')[0]
                    return (
                        <ThemedSectionContainer>
                            <ThemedPressable onPress={() => router.push({pathname: '/edit-expense', params: {id: item.id}})}>
                                <ThemedSection>
                                    <ExpenseCard 
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
            <ThemedPressable type="floatButton" onPress={() => router.push('/add-expense')}>
                <ThemedText>+</ThemedText>
            </ThemedPressable>
        </ThemedContainer>
    );
}