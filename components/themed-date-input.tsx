import { formatDate } from '@/utils/date';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { ThemedPressable } from './themed-pressable';
import { ThemedSection } from './themed-section';
import { ThemedSectionText } from './themed-section-text';

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
    <ThemedSection>
        <ThemedPressable type="date" onPress={() => setShow(true)}>
            <ThemedSectionText type='date'>{date ? formatDate(date) : "Seleccionar fecha"}</ThemedSectionText>
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
    </ThemedSection>
  );
}