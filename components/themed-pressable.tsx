import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

export type ThemedPressableProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'button' | 'date' | 'floatButton' | 'buttonDelete';
};

export function ThemedPressable({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedPressableProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    return (
        <Pressable
            style={[
                type === 'default' ? styles.default : undefined,
                type === 'button' ? styles.button : undefined,
                type === 'buttonDelete' ? styles.buttonDelete : undefined,
                type === 'floatButton' ? styles.floatButton : undefined,
                type === 'date' ? styles.date : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
    },
    button: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonDelete: {
        backgroundColor: '#a40a0a',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    date: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    floatButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#0aa40a',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // Android shadow
    },
});