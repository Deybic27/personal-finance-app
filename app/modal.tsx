import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { CategoryForm } from '@/components/forms/category-form';
import { ExpenseForm } from '@/components/forms/expense-form';
import { IncomeForm } from '@/components/forms/income-form';
import { ThemedPressable } from '@/components/themed-pressable';

type ModalParams = {
  type?: 'income' | 'expense' | 'category';
};

export default function ModalScreen() {
  const { type } = useLocalSearchParams<ModalParams>();
  return (
    <ThemedView style={styles.container}>
      {/* <ThemedText type="title">This is a modal</ThemedText> */}
      {type === 'income' && <IncomeForm />}
      {type === 'expense' && <ExpenseForm />}
      {type === 'category' && <CategoryForm />}
      {/* <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link> */}
      <ThemedPressable style={styles.link} onPress={() => router.back()}>
        <ThemedText type="link">Atrás</ThemedText>
      </ThemedPressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
