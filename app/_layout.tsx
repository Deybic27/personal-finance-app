import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';
import { initDatabase } from '../database/db';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    try {
      initDatabase()
    } catch (error) {
      console.error("Error al inicializar la DB: ", error)
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="add-income" options={{title: 'Agregar ingreso' }} />
        <Stack.Screen name="add-expense" options={{title: 'Agregar gasto' }} />
        <Stack.Screen name="add-category" options={{title: 'Agregar categoría' }} />
        <Stack.Screen name="list-income-categories" options={{title: 'Categorías de ingreso' }} />
        <Stack.Screen name="list-expense-categories" options={{title: 'Categorías de gasto' }} />
        <Stack.Screen name="expenses" options={{title: 'Gastos' }} />
        <Stack.Screen name="incomes" options={{title: 'Ingresos' }} />
        <Stack.Screen name="edit-income" options={{title: 'Editar ingreso' }} />
        <Stack.Screen name="edit-expense" options={{title: 'Editar gasto' }} />
        <Stack.Screen name="edit-category" options={{title: 'Editar categoría' }} />
        <Stack.Screen name="categories" options={{title: 'Categorías' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
