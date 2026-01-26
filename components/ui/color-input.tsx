import { StyleSheet } from "react-native";
import { ThemedPressable } from "../themed-pressable";

type ColorInputProps = {
    color ?: string;
}

export function ColorInput({
    color,
    ...rest
}: ColorInputProps) {
    return (
        <ThemedPressable style={[styles.circle, {backgroundColor: color}]}/>
    );
}

const styles = StyleSheet.create(
{
    circle: {
        width: 25,
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderRadius: 25,
        borderWidth: 0,
        borderColor: '#555',    
    },
}
)