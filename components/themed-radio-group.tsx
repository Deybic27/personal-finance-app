import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet } from "react-native";
import { ThemedPressable } from "./themed-pressable";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
    options: Option[];
    value: string;
    lightColor?: string;
    darkColor?: string;
    onChange: (value: string) => void;
};

export function ThemedRadioGroup({ lightColor, darkColor, options, value, onChange }: RadioGroupProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <ThemedView>
            {options.map(option => {
                const selected = option.value === value;

                return (
                <ThemedPressable
                    key={option.value}
                    style={styles.option}
                    onPress={() => onChange(option.value)}
                >
                    <ThemedView style={[styles.circle, selected && { backgroundColor: color }]} />
                    <ThemedText>{option.label}</ThemedText>
                </ThemedPressable>
                );
            })}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  default: {
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 8,
  }
});
