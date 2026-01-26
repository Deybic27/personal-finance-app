import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
};

export function ThemedTextInput({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextInputProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <TextInput
            style={[
                type === 'default' ? styles.default : undefined,
                style,
            ]}
            placeholderTextColor="#757575"
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
  default: {
    color: "#000",
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});