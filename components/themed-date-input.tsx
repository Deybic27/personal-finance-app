import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { ThemedPressable } from './themed-pressable';
import { ThemedText } from './themed-text';
import { ThemedView } from "./themed-view";

export function ThemedDateInput() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <ThemedView>
        <ThemedPressable type="date" onPress={() => setShow(true)}>
            <ThemedText type='date'>{date ? date.toISOString().split('T')[0] : "Seleccionar fecha"}</ThemedText>
        </ThemedPressable>

        {show && (
        <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) setDate(selectedDate);
            }}
        />
        )}
    </ThemedView>
  );
}