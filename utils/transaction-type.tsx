export type TransactionType = 'income' | 'expense';

export const TRANSACTION_TYPES: Record<TransactionType, { name: string; table: string }> = {
  income: {
    name: 'Ingreso',
    table: 'incomes',
  },
  expense: {
    name: 'Gasto',
    table: 'expenses',
  },
};

export function isTransactionType(value: string): value is 'income' | 'expense' {
  return value === 'income' || value === 'expense';
}

export function getTransactionTypeName(type: TransactionType) {
    return TRANSACTION_TYPES[type].name;
}

export function getTransactionTypeTable(type: TransactionType) {
    return TRANSACTION_TYPES[type].table;
}
