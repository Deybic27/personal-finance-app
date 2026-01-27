import { FlatList, StyleSheet } from "react-native";
import { ThemedPressable } from "./themed-pressable";
import { ThemedSection } from "./themed-section";
import { ThemedSectionText } from "./themed-section-text";
import { ThemedView } from "./themed-view";

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
};

export function ThemedRadioGroup({options, value, onChange }: RadioGroupProps) {
    return (
        <ThemedSection>
            <FlatList
                data={options}
                keyExtractor={item => String(item.value)}
                renderItem={({item}) => {
                const selected = item.value === value;
                    return (
                        <ThemedPressable
                            style={styles.option}
                            onPress={() => onChange(item.value)}
                        >
                            <ThemedView style={[styles.circle, selected && { backgroundColor: "#0a7ea4" }]} />
                            <ThemedSectionText>{item.label}</ThemedSectionText>
                        </ThemedPressable>
                    )
                }}
            />
        </ThemedSection>
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
    borderWidth: 1,
    borderColor: '#555',
    marginRight: 8,
    backgroundColor: "#fff",
  }
});
