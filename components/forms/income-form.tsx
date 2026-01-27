import { getCategoriesByType, insertIncome } from "@/database/db";
import { formatDate } from "@/utils/date";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { HelloWave } from "../hello-wave";
import { ThemedContainer } from "../themed-container";
import { ThemedDateInput } from "../themed-date-input";
import { ThemedPicker } from "../themed-picker";
import { ThemedPressable } from "../themed-pressable";
import { ThemedSection } from "../themed-section";
import { ThemedSectionContainer } from "../themed-section-container";
import { ThemedSectionText } from "../themed-section-text";
import { ThemedTextInput } from "../themed-text-input";

type Category = {
  label: string;
  value: string;
};

export function IncomeForm(){
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date())
  const [note, setNote] = useState('')

    const [categories, setCategories] = useState<Category[]>([]);
      useFocusEffect(
        useCallback(() => {
          try {
            const data = getCategoriesByType('income');

            setCategories(
              data.map(category => ({
                label: category.name,
                value: String(category.id),
              }))
            );
          } catch(error) {
            console.error("Error loading income form", error);
          }
        }, [])
      );

      function handleSubmit() {
        try {
            if (!amount) {
            Alert.alert('Error', 'El monto es obligatorio');
            return;
            }
            if (!category) {
            Alert.alert('Error', 'La categoría es obligatoria');
            return;
            }
            if (!date) {
            Alert.alert('Error', 'La fecha es obligatoria');
            return;
            }

            const expenseAmount = parseInt(amount)
            const incomeDate = formatDate(date, 'db')
              insertIncome(
                expenseAmount,
                category,
                incomeDate,
                note
              );
              console.log("Insert Income: ", expenseAmount, category, incomeDate, note);
              Alert.alert("Mensaje", "Ingreso guardado");
              
              router.back();
        } catch(error) {
          console.error("Error insert income", error);
          Alert.alert("Error", "Ingreso no guardó");
          return;
        }
      }
    return (
      <ThemedContainer>
        <ThemedSectionContainer>
          <ThemedSection style={styles.titleContainer}>
            <ThemedSectionText type="title">Agregar ingreso</ThemedSectionText>
            <HelloWave />
          </ThemedSection>
          <ThemedSection style={styles.stepContainer}>
            <ThemedSectionText type="subtitle">Monto</ThemedSectionText>
            <ThemedTextInput value={amount} onChangeText={setAmount} type="default" placeholder="Ej: 50000" keyboardType="numeric" />
          </ThemedSection>
          <ThemedSection style={styles.stepContainer}>
            <ThemedSectionText type="subtitle">Categoría</ThemedSectionText>
            <ThemedPicker type="default" items={categories} value={category} onChange={setCategory}/>
            <ThemedPressable onPress={() => router.push('/add-category')}>
              <ThemedSectionText type="link">+ Agregar categoría</ThemedSectionText>
            </ThemedPressable>
          </ThemedSection>
          <ThemedSection style={styles.stepContainer}>
            <ThemedSectionText type="subtitle">Fecha</ThemedSectionText>
            <ThemedDateInput value={date} onChange={setDate} />
          </ThemedSection>
          <ThemedSection style={styles.stepContainer}>
            <ThemedSectionText type="subtitle">Notas adicionales</ThemedSectionText>
            <ThemedTextInput value={note} onChangeText={setNote} type="default" placeholder="Ej: Cena con amigos" />
          </ThemedSection>
          <ThemedSection style={styles.stepContainer}>
            <ThemedPressable type="button" onPress={handleSubmit}>
              <ThemedSectionText type="button">Guardar</ThemedSectionText>
            </ThemedPressable>
          </ThemedSection>
        </ThemedSectionContainer>
      </ThemedContainer>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
