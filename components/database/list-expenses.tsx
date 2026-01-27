import { getExpensesWithCategory } from "@/database/db";
import { formatDate } from "@/utils/date";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedPressable } from "../themed-pressable";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
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
            setExpenses(getExpensesWithCategory());
        }, [])
    );
    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={expenses}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    // const date = new Date(item.date).toISOString().split('T')[0]
                    return (
                        <ThemedView style={styles.sectionCard}>
                            <ThemedPressable onPress={() => router.push({pathname: '/edit-expense', params: {id: item.id}})}>
                                <ExpenseCard 
                                    colorCategory={item.categoryColor}
                                    nameCategory={item.categoryName}
                                    amount={item.amount}
                                    date={formatDate(item.date)}
                                    note={item.note}
                                />
                            </ThemedPressable>
                        </ThemedView>
                    );
                }}
            />
            <ThemedPressable type="floatButton" onPress={() => router.push('/add-expense')}>
                <ThemedText>+</ThemedText>
            </ThemedPressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionCard: {
        padding: 10,
    },
})