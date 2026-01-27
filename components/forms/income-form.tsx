import { getCategoriesByType, insertIncome } from "@/database/db";
import { formatDate } from "@/utils/date";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { HelloWave } from "../hello-wave";
import ParallaxScrollView from "../parallax-scroll-view";
import { ThemedDateInput } from "../themed-date-input";
import { ThemedPicker } from "../themed-picker";
import { ThemedPressable } from "../themed-pressable";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

type Category = {
  label: string;
  value: string;
};

export function IncomeForm(){
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

    const [categories, setCategories] = useState<Category[]>([]);
      useFocusEffect(
        useCallback(() => {
          const data = getCategoriesByType('income');
          // console.log("Categorias de Incomes: ", data);
          // const dataIncomes = getIncomes();
          // console.log("Incomes: ", dataIncomes);

          setCategories(
            data.map(category => ({
              label: category.name,
              value: String(category.id),
            }))
          );
        }, [])
      );

      function handleSubmit() {
            if (!amount) {
            Alert.alert('Error', 'El monto es obligatorio');
            return;
            }
            if (!category) {
            Alert.alert('Error', 'La categoria es obligatoria');
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
        }
    return (
        <ParallaxScrollView
              headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
              headerImage={
                <Image
                  source={require('@/assets/images/partial-react-logo.png')}
                  style={styles.reactLogo}
                />
              }
          >
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Agregar ingreso</ThemedText>
                <HelloWave />
              </ThemedView>
              <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Monto</ThemedText>
                <ThemedTextInput value={amount} onChangeText={setAmount} type="default" placeholder="Ej: 50000" keyboardType="numeric" />
              </ThemedView>
              <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Categoría</ThemedText>
                <ThemedPicker type="default" items={categories} value={category} onChange={setCategory}/>
                <ThemedPressable onPress={() => router.push('/add-category')}>
                  <ThemedText type="link">+ Agregar categoría</ThemedText>
                </ThemedPressable>
              </ThemedView>
              <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Fecha</ThemedText>
                <ThemedDateInput value={date} onChange={setDate} />
              </ThemedView>
              <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Notas adicionales</ThemedText>
                <ThemedTextInput value={note} onChangeText={setNote} type="default" placeholder="Ej: Cena con amigos" />
              </ThemedView>
              <ThemedView style={styles.stepContainer}>
                <ThemedPressable type="button" onPress={handleSubmit}>
                  <ThemedText type="button">Guardar</ThemedText>
                </ThemedPressable>
              </ThemedView>
            </ParallaxScrollView>
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
