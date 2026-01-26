import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { ThemedPressable } from './themed-pressable';
import { ThemedText } from './themed-text';
import { ThemedView } from "./themed-view";

type ThemedDateInputProps = {
  value: Date;
  onChange: (value: Date) => void;
}

export function ThemedDateInput({
  value,
  onChange
}: ThemedDateInputProps) {
  const [show, setShow] = useState(false);
  console.log(value);
  return (
    <ThemedView>
        <ThemedPressable type="date" onPress={() => setShow(true)}>
            <ThemedText type='date'>{value ? value.toISOString().split('T')[0] : "Seleccionar fecha"}</ThemedText>
            {/* value.toISOString().split('T')[0] */}
        </ThemedPressable>

        {show && (
        <DateTimePicker
            value={new Date(value)}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) onChange(selectedDate);
            }}
        />
        )}
    </ThemedView>
  );
}