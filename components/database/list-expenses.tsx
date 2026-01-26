import { getExpensesWithCategory } from "@/app/database/db";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedPressable } from "../themed-pressable";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { ExpenseCard } from "../ui/expense-card";

export function ListExpenses() {
    const [expenses, setExpenses] = useState(getExpensesWithCategory())

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
                    const date = new Date(item.date).toISOString().split('T')[0]
                    return (
                        <ThemedView style={styles.sectionCard}>
                            <ExpenseCard 
                                colorCategory={item.categoryColor}
                                nameCategory={item.categoryName}
                                amount={item.amount}
                                date={date}
                                note={item.note}
                            />
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
        backgroundColor: "#fff"
    },
})