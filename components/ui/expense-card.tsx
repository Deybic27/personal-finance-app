import { useThemeColor } from "@/hooks/use-theme-color";
import { formatMoney } from "@/utils/format-money";
import { StyleSheet } from "react-native";
import { ThemedSection } from "../themed-section";
import { ThemedSectionText } from "../themed-section-text";
import { ColorInput } from "./color-input";

type ExpenseCardProps = {
    colorCategory : string; 
    nameCategory : string; 
    amount : number; 
    date : string;
    note ?: string;
    lightColor?: string;
    darkColor?: string;
}

export function ExpenseCard({
    colorCategory,
    nameCategory,
    amount,
    note,
    date,
    lightColor,
    darkColor,
}: ExpenseCardProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'textSection');
    return (
        <ThemedSection style={styles.container}>
            <ThemedSection style={styles.firtsLine}>
                <ThemedSection style={[styles.firtsColumn, styles.column]}>
                    <ColorInput color={colorCategory}/>
                </ThemedSection>
                <ThemedSection style={[styles.secondColumn, styles.column]}>
                    <ThemedSectionText type="defaultSemiBold" style={[{color: color}]}>{nameCategory}</ThemedSectionText>
                </ThemedSection>
                <ThemedSection style={[styles.thirdColumn, styles.column]}>
                    <ThemedSectionText style={[{color: color}]}>{formatMoney(amount)}</ThemedSectionText>
                </ThemedSection>
            </ThemedSection>
            <ThemedSection style={styles.secondLine}>
                <ThemedSection>
                    <ThemedSectionText style={[{color: color}]}>{date}</ThemedSectionText>
                </ThemedSection>
                <ThemedSection>
                    <ThemedSectionText style={[{color: color}]}>{note}</ThemedSectionText>
                </ThemedSection>
            </ThemedSection>
        </ThemedSection>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        // padding: 10,
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