import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { ColorInput } from "./color-input";

type IncomeCardProps = {
    colorCategory ?: string; 
    nameCategory ?: string; 
    amount ?: number; 
    note ?: string;
    date ?: string;
}

export function IncomeCard({
    colorCategory,
    nameCategory,
    amount,
    note,
    date
}: IncomeCardProps) {
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.firtsLine}>
                <ThemedView style={[styles.firtsColumn, styles.column]}>
                    <ColorInput color={colorCategory}/>
                </ThemedView>
                <ThemedView style={[styles.secondColumn, styles.column]}>
                    <ThemedText>{nameCategory}</ThemedText>
                </ThemedView>
                <ThemedView style={[styles.thirdColumn, styles.column]}>
                    <ThemedText>{amount}</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.secondLine}>
                <ThemedView>
                    <ThemedText>{date}</ThemedText>
                </ThemedView>
                <ThemedView>
                    <ThemedText>{note}</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        padding: 10,
    },
    firtsLine: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    secondLine: {
        width: '100%',
    },
    column: {
        display: "flex",
    },
    firtsColumn: {
    },
    secondColumn: {
        flexGrow: 1,
    },
    thirdColumn: {
    },
})