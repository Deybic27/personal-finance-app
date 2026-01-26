import { Image } from 'expo-image';
import { Alert, StyleSheet } from 'react-native';

import { getCategoriesByType, getExpenses, insertExpense } from '@/app/database/db';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ThemedDateInput } from '../themed-date-input';
import { ThemedPicker } from '../themed-picker';
import { ThemedPressable } from '../themed-pressable';
import { ThemedTextInput } from '../themed-text-input';

export function ExpenseForm() {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date())
  const [note, setNote] = useState('')

  const [categories, setCategories] = useState([{label: '', value: ''}]);
  useFocusEffect(
    useCallback(() => {
      const data = getCategoriesByType('expense');
      console.log("Categorias de Expenses: ", data);
      const dataExpenses = getExpenses();
      console.log("Expenses: ", dataExpenses);

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
    const expenseDate = date.toLocaleDateString('en-CA')

    console.log("Insert Expense: ", expenseAmount, category, expenseDate, note);
    insertExpense(
        expenseAmount,
        category,
        expenseDate,
        note
    );

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
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Agregar gasto</ThemedText>
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
          <ThemedText type="button">Guardar gasto</ThemedText>
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
