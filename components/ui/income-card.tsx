import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet } from "react-native";
import { ThemedSection } from "../themed-section";
import { ThemedText } from "../themed-text";
import { ColorInput } from "./color-input";

type IncomeCardProps = {
    colorCategory ?: string; 
    nameCategory ?: string; 
    amount ?: number; 
    note ?: string;
    date ?: string;
    lightColor?: string;
    darkColor?: string;
}

export function IncomeCard({
    colorCategory,
    nameCategory,
    amount,
    note,
    date,
    lightColor,
    darkColor,
}: IncomeCardProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'textSection');
    return (
        <ThemedSection style={styles.container}>
            <ThemedSection style={styles.firtsLine}>
                <ThemedSection style={[styles.firtsColumn, styles.column]}>
                    <ColorInput color={colorCategory}/>
                </ThemedSection>
                <ThemedSection style={[styles.secondColumn, styles.column]}>
                    <ThemedText style={[{color: color}]}>{nameCategory}</ThemedText>
                </ThemedSection>
                <ThemedSection style={[styles.thirdColumn, styles.column]}>
                    <ThemedText style={[{color: color}]}>{amount}</ThemedText>
                </ThemedSection>
            </ThemedSection>
            <ThemedSection style={styles.secondLine}>
                <ThemedSection>
                    <ThemedText style={[{color: color}]}>{date}</ThemedText>
                </ThemedSection>
                <ThemedSection>
                    <ThemedText style={[{color: color}]}>{note}</ThemedText>
                </ThemedSection>
            </ThemedSection>
        </ThemedSection>
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