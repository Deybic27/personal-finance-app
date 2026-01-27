import { TransactionType } from '@/utils/transaction-type';
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('finance.db');

export function initDatabase() {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        note TEXT
      );
    `);
    db.execSync(`
      CREATE TABLE IF NOT EXISTS incomes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        note TEXT
      );
    `);
    db.execSync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        color TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw new Error('Failed to initialize database');
  }
}

export function insertExpense(
  amount: number,
  category: string,
  date: string,
  note?: string
) {
  try {
    db.runSync(
      `
      INSERT INTO expenses (amount, category, date, note)
      VALUES (?, ?, ?, ?)
      `,
      [amount, category, date, note ?? null]
    );
  } catch (error) {
    console.error('Error Insert Expense: ', error);
    throw new Error('Failed to insert expense')
  }
}

export function insertIncome(
  amount: number,
  category: string,
  date: string,
  note?: string
) {
  try {
    db.runSync(
      `
      INSERT INTO incomes (amount, category, date, note)
      VALUES (?, ?, ?, ?)
      `,
      [amount, category, date, note ?? null]
    );
  } catch (error) {
    console.error('Error to insert income: ', error);
    throw new Error('Failed to insert income')
  }
}

export function updateIncome(
  id: number,
  amount: number,
  category: string,
  date: string,
  note?: string
) {
  try {
    db.runSync(
      `
      UPDATE incomes
      SET amount = ?, category = ?, date = ?, note = ?
      WHERE id = ?
      `,
      [amount, category, date, note ?? null, id]
    );
  } catch (error) {
    console.error('Error to update income: ', error);
    throw new Error('Failed to update income')
  }
}

export function updateExpense(
  id: number,
  amount: number,
  category: string,
  date: string,
  note?: string
) {
  try {
    db.runSync(
      `
      UPDATE expenses
      SET amount = ?, category = ?, date = ?, note = ?
      WHERE id = ?
      `,
      [amount, category, date, note ?? null, id]
    );
  } catch (error) {
    console.error('Error to update expense: ', error);
    throw new Error('Failed to update expense')
  }
}

export function insertCategory(
  name: string,
  type: string,
  color?: string
) {
  try {
    db.runSync(
      `
      INSERT INTO categories (name, type, color)
      VALUES (?, ?, ?)
      `,
      [name, type, color ?? null]
    );
  } catch (error) {
    console.error('Error to insert category: ', error);
    throw new Error('Failed to insert income')
  }
}

export function updateCategory(
  id: number,
  name: string,
  color: string
) {
  try {
    db.runSync(
      `
      UPDATE categories
      SET name = ?, color = ?
      WHERE id = ?
      `,
      [name, color, id]
    );
  } catch (error) {
    console.error('Error to update category: ', error);
    throw new Error('Failed to update category')
  }
}

export function deleteCategory(id: number) {
  try {
    db.runSync(
      `DELETE FROM categories WHERE id = ?`,
      [id]
    );
  } catch (error) {
    console.error('Error to delete category: ', error);
    throw new Error('Failed to delete category')
  }
}

export function getCategory(id: number) {
  try {
    const result = db.getFirstSync<{ id: number; name: string; type: TransactionType; color: string }>(`
      SELECT * FROM categories
      WHERE id = ?
    `, [id]);
    return result;
  } catch (error) {
    console.error('Error to get category: ', error);
    throw new Error('Failed to get category')
  }
}

export function getCategoryByName(name: string, type: string = 'income') {
  try {
    return db.getAllSync(
      `SELECT * FROM categories WHERE name = ? AND type = ?`,
      [name, type]
    );
  } catch (error) {
    console.error('Error to get category by name: ', error);
    throw new Error('Failed to get category by name')
  }
}

export function getCategoryCountRecords(table: string, category: string) {
  try {
    const result = db.getFirstSync<{countRecords: number}>(
      `SELECT COUNT(*) AS countRecords FROM ${table} WHERE category = ?`,
      [category]
    );
    return result ? result.countRecords : 0;
  } catch (error) {
    console.error('Error to get category by name: ', error);
    throw new Error('Failed to get category by name')
  }
}

export function getExpenses() {
  try {
    return db.getAllSync(`
      SELECT * FROM expenses
      ORDER BY date DESC
    `);
  } catch (error) {
    console.error('Error to get exponse: ', error);
    throw new Error('Failed to get exponse')
  }
}

export function getExpenseById(id: number) {
  try {
    const result = db.getFirstSync<{ id: number; amount: number; category: number; date: string, note: string }>(`
      SELECT * FROM expenses
      WHERE id = ?
    `, [id]);
    return result;
  } catch (error) {
    console.error('Error to get expense by Id: ', error);
    throw new Error('Failed to get expense by Id')
  }
}

export function getExpensesWithCategory(): Array<{ id: number; amount: number; date: string, note: string; categoryId: number; categoryName: string; categoryColor: string; }> {
  try {
    return db.getAllSync(`
      SELECT
        expenses.id,
        expenses.amount,
        expenses.date,
        expenses.note,
        categories.id AS categoryId,
        categories.name AS categoryName,
        categories.color AS categoryColor
      FROM expenses
      INNER JOIN categories
        ON expenses.category = categories.id
      ORDER BY expenses.date DESC;
    `);
  } catch (error) {
    console.error('Error to get expenses: ', error);
    throw new Error('Failed to get expenses')
  }
}

export function getIncomes(): Array<{ id: number; amount: number; category: number; date: string, note: string }> {
  try {
    return db.getAllSync(`
      SELECT * FROM incomes
      ORDER BY date DESC
    `);
  } catch (error) {
    console.error('Error to get incomes: ', error);
    throw new Error('Failed to get incomes')
  }
}

export function getIncomeById(id: number) {
  try {
    const result = db.getFirstSync<{ id: number; amount: number; category: number; date: string, note: string }>(`
      SELECT * FROM incomes
      WHERE id = ?
    `, [id]);
    return result;
  } catch (error) {
    console.error('Error to get income by Id: ', error);
    throw new Error('Failed to get income by Id')
  }
}

export function getTotalIncomes() {
  try {
    const result = db.getFirstSync<{ totalAmount: number | null}>(`
      SELECT COALESCE(SUM(amount), 0) as totalAmount FROM incomes;
    `);
    return result?.totalAmount ?? 0;
  } catch (error) {
    console.error('Error to get total incomes: ', error);
    throw new Error('Failed to get total incomes')
  }
}

export function getTotalExpenses() {
  try {
    const result = db.getFirstSync<{ totalAmount: number | null}>(`
      SELECT COALESCE(SUM(amount), 0) as totalAmount FROM expenses;
    `);
    return result?.totalAmount ?? 0;
  } catch (error) {
    console.error('Error to get total expenses: ', error);
    throw new Error('Failed to get total expenses')
  }
}

export function getSaldo() {
  try {
    const result = db.getFirstSync<{ saldo: number | null}>(`
      WITH
      total_incomes AS (
        SELECT COALESCE(SUM(amount), 0) AS total FROM incomes
      ),
      total_expenses AS (
        SELECT COALESCE(SUM(amount), 0) AS total FROM expenses
      )
      SELECT
        total_incomes.total - total_expenses.total AS saldo
      FROM total_incomes, total_expenses;
    `);
    return result?.saldo ?? 0;
  } catch (error) {
    console.error('Error to get saldo: ', error);
    throw new Error('Failed to get saldo')
  }
}

export function getIncomesWithCategory(): Array<{ id: number; amount: number; date: string, note: string; categoryId: number; categoryName: string; categoryColor: string; }> {
  try {
    return db.getAllSync(`
      SELECT
        incomes.id,
        incomes.amount,
        incomes.date,
        incomes.note,
        categories.id AS categoryId,
        categories.name AS categoryName,
        categories.color AS categoryColor
      FROM incomes
      INNER JOIN categories
        ON incomes.category = categories.id
      ORDER BY incomes.date DESC;
    `);
  } catch (error) {
    console.error('Error to get incomes: ', error);
    throw new Error('Failed to get incomes')
  }
}

export function getCategories(): Array<{ id: number; name: string; type: string; color: string }> {
  try {
    return db.getAllSync(`
      SELECT * FROM categories
      ORDER BY name ASC
    `);
  } catch (error) {
    console.error('Error to get categories: ', error);
    throw new Error('Failed to get categories')
  }
}

export function getCategoriesByType(type: string = 'income'): Array<{ id: number; name: string; type: string; color: string }> {
  try {
    return db.getAllSync(`
      SELECT * FROM categories WHERE type = ?
      ORDER BY name ASC
    `, [type]);
  } catch (error) {
    console.error('Error to get categories by type: ', error);
    throw new Error('Failed to get categories by type')
  }
}

export function deleteExpense(id: number) {
  try {
    db.runSync(
      `DELETE FROM expenses WHERE id = ?`,
      [id]
    );
  } catch (error) {
    console.error('Error to delete expense: ', error);
    throw new Error('Failed to delete expense')
  }
}

export function deleteIncome(id: number) {
  try{
    db.runSync(
      `DELETE FROM incomes WHERE id = ?`,
      [id]
    );
  } catch (error) {
    console.error('Error to delete income: ', error);
    throw new Error('Failed to delete income')
  }
}

export function resetDb() {
  try {
    db.runSync(
      `DROP TABLE IF EXISTS categories`
    );
    db.runSync(
      `DROP TABLE IF EXISTS incomes`
    );
    db.runSync(
      `DROP TABLE IF EXISTS expenses`
    );
    db.runSync(
      `DROP DATABASE finance`
    );
  } catch (error) {
    console.error('Error to reset database: ', error);
    throw new Error('Failed to reset database')
  }
}