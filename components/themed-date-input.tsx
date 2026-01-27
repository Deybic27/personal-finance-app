import { formatDate } from '@/utils/date';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { ThemedPressable } from './themed-pressable';
import { ThemedText } from './themed-text';
import { ThemedView } from "./themed-view";

type ThemedDateInputProps = {
  value: string;
  onChange: (value: string) => void;
}

export function ThemedDateInput({
  value,
  onChange
}: ThemedDateInputProps) {
  const [show, setShow] = useState(false);
  const date = value ? value : new Date()
  return (
    <ThemedView>
        <ThemedPressable type="date" onPress={() => setShow(true)}>
            <ThemedText type='date'>{date ? formatDate(date) : "Seleccionar fecha"}</ThemedText>
            {/* value.toISOString().split('T')[0] */}
        </ThemedPressable>

        {show && (
        <DateTimePicker
          value={new Date(date)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) onChange(formatDate(selectedDate, 'db'));
          }}
        />
        )}
    </ThemedView>
  );
}