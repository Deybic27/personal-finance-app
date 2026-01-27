import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet } from "react-native";
import { ThemedSection } from "../themed-section";
import { ThemedText } from "../themed-text";
import { ColorInput } from "./color-input";

type CategoryCardProps = {
    color ?: string; 
    name ?: string; 
    button ?: string;
    lightColor?: string;
    darkColor?: string;
}

export function CategoryCard({
    color,
    name,
    button,
    lightColor,
    darkColor,
}: CategoryCardProps) {
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textSection');
    return (
        <ThemedSection style={styles.container}>
            <ThemedSection style={styles.firtsLine}>
                <ThemedSection style={[styles.firtsColumn, styles.column]}>
                    <ColorInput color={color}/>
                </ThemedSection>
                <ThemedSection style={[styles.secondColumn, styles.column]}>
                    <ThemedText style={[{color: textColor}]}>{name}</ThemedText>
                </ThemedSection>
                <ThemedSection style={[styles.thirdColumn, styles.column]}>
                    <ThemedText>{button}</ThemedText>
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