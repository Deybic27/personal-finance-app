import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { getCategoriesByType } from '@/app/database/db';
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
  const [categories, setCategories] = useState([{label: '', value: ''}]);
  useFocusEffect(
    useCallback(() => {
      const data = getCategoriesByType('expense');
      console.log(data);

      setCategories(
        data.map(category => ({
          label: category.name,
          value: String(category.id),
        }))
      );
    }, [])
  );
  
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
        <ThemedTextInput type="default" placeholder="Ej: 50000" keyboardType="numeric" />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Categoría</ThemedText>
        <ThemedPicker type="default" items={categories} />
        <ThemedPressable onPress={() => router.push('/add-category')}>
          <ThemedText type="link">+ Agregar categoría</ThemedText>
        </ThemedPressable>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Fecha</ThemedText>
        <ThemedDateInput />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Notas adicionales</ThemedText>
        <ThemedTextInput type="default" placeholder="Ej: Cena con amigos" />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedPressable type="button">
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
