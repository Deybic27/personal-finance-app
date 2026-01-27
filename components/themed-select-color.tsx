import { FlatList, StyleSheet } from "react-native";
import { ThemedPressable } from "./themed-pressable";
import { ThemedSection } from "./themed-section";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Option = {
  color: string;
};

type ThemedSelectColorProps = {
    options: Option[];
    value: string;
    lightColor?: string;
    darkColor?: string;
    onChange: (value: string) => void;
};

export function ThemedSelectColor({options, value, onChange }: ThemedSelectColorProps) {
    return(
        <ThemedSection>
            <FlatList
              data={options}
              keyExtractor={item => item.color}
              horizontal={true}
              nestedScrollEnabled={true}
              renderItem={({item}) => {
                const selected = item.color === value;

                return (
                  <ThemedPressable
                    style={styles.option}
                    onPress={() => onChange(item.color)}
                >
                    <ThemedView style={[styles.circle, selected && { backgroundColor: item.color }, { backgroundColor: item.color }]}>
                        <ThemedText style={[styles.hidden, selected && styles.active]}>✓</ThemedText>
                    </ThemedView>
                </ThemedPressable>
                );
              }}
            />
        </ThemedSection>
    );
}

const styles = StyleSheet.create({
  default: {
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
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
  hidden: {
    opacity: 0,
  },
  active: {
    color: '#fff',
    opacity: 1,
  }
});