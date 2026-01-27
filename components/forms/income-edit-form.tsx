import { deleteIncome, getCategoriesByType, getIncomeById, updateIncome } from "@/database/db";
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

type IncomeEditFormProps = {
  incomeId: number
}

type Category = {
  label: string;
  value: string;
};

export function IncomeEditForm({
  incomeId
}: IncomeEditFormProps){
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

        const currentIncome = getIncomeById(incomeId)
        setAmount(String(currentIncome?.amount));
        setCategory(String(currentIncome?.category));
        setDate(new Date(String(currentIncome?.date)));
        setNote(String(currentIncome?.note));
      } catch(error) {
        console.error("Error loading income edit form", error);
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

        const exists = getIncomeById(incomeId);
        if(!exists) { 
          Alert.alert("Error", "Ingreso no existe");
          return null;
        }
  
        const expenseAmount = parseInt(amount)
        const incomeDate = formatDate(date, 'db')
        // return(console.log(amount, category, date, note));
        // return(console.log(expenseAmount, category, incomeDate, note));
        updateIncome(
          incomeId,
          expenseAmount,
          category,
          incomeDate,
          note
        );
        console.log("Update Income: ", expenseAmount, category, incomeDate, note);
        Alert.alert("Mensaje", "Ingreso actualizado");

        router.back();
    } catch(error) {
      console.error("Error edit income", error);
      Alert.alert("Error", "Ingreso no guardó");
      return;
    }
  }

    function handleDelete() {
      try {
        const exists = getIncomeById(incomeId);
        if(!exists) { 
            Alert.alert("Error", "El ingreso no existe");
            return;
        }
        deleteIncome(incomeId);
        console.log("Delete Income", incomeId);
        Alert.alert("Mensaje", "El ingreso ha sido eliminado");

        router.back();
      } catch(error) {
        console.error("Error delete income", error);
        Alert.alert("Error", "Ingreso no se eliminó");
        return;
      }
    }
    return (
      <ThemedContainer>
        <ThemedSectionContainer>
          <ThemedSection style={styles.titleContainer}>
            <ThemedSectionText type="title">Editar ingreso</ThemedSectionText>
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
            <ThemedPressable type="buttonDelete" onPress={handleDelete}>
              <ThemedSectionText type="button">Eliminar</ThemedSectionText>
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
