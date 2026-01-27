import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker, type PickerProps } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { ThemedView } from './themed-view';

type PickerItem = {
  label: string;
  value: string;
};

export type ThemedPickerProps = PickerProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
  items: PickerItem[];
  value: string;
  onChange: (value: string) => void;
};

export function ThemedPicker({
    items,
    value,
    onChange,
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedPickerProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <ThemedView style={[
                type === 'default' ? styles.default : undefined,
            ]}
            {...rest}
        >
            <Picker
                style={[{color: "#000"}]}
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
            >
                <Picker.Item label="Seleccione"/>
                {items.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});