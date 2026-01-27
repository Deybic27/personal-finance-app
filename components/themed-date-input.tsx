import { formatDate } from '@/utils/date';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { ThemedPressable } from './themed-pressable';
import { ThemedSection } from './themed-section';
import { ThemedSectionText } from './themed-section-text';

type ThemedDateInputProps = {
  value: Date;
  onChange: (value: Date) => void;
}

export function ThemedDateInput({
  value,
  onChange
}: ThemedDateInputProps) {
  const [show, setShow] = useState(false);
  console.log("value: ", value);
  return (
    <ThemedSection>
        <ThemedPressable type="date" onPress={() => setShow(true)}>
            <ThemedSectionText type='date'>{value ? formatDate(value) : "Seleccionar fecha"}</ThemedSectionText>
        </ThemedPressable>

        {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) onChange(selectedDate);
          }}
        />
        )}
    </ThemedSection>
  );
}