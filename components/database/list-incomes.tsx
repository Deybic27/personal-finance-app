import { getIncomesWithCategory } from "@/database/db";
import { formatDate } from "@/utils/date";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedPressable } from "../themed-pressable";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
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
        <ThemedView style={styles.container}>
            <FlatList
                data={incomes}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <ThemedView style={styles.sectionCard}>
                            <ThemedPressable onPress={() => router.push({pathname: '/edit-income', params: {id: item.id}})}>
                                <IncomeCard 
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
            <ThemedPressable type="floatButton" onPress={() => router.push('/add-income')}>
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