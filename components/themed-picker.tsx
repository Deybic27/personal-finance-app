import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker, type PickerProps } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type PickerItem = {
  label: string;
  value: string;
};

export type ThemedPickerProps = PickerProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
  items: PickerItem[];
};

export function ThemedPicker({
    items,
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedPickerProps) {
    const [value, setValue] = useState('food');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <View style={[
                type === 'default' ? styles.default : undefined,
            ]}
            {...rest}
        >
            <Picker
                selectedValue={value}
                onValueChange={(itemValue) => setValue(itemValue)}
            >
                <Picker.Item label="Seleccione"/>
                {items.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
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