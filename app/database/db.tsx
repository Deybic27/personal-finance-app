import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('finance.db');

export default function initDatabase() {
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
}

export function insertExpense(
  amount: number,
  category: string,
  date: string,
  note?: string
) {
  db.runSync(
    `
    INSERT INTO expenses (amount, category, date, note)
    VALUES (?, ?, ?, ?)
    `,
    [amount, category, date, note ?? null]
  );
}

export function insertIncome(
  amount: number,
  category: string,
  date: string,
  note?: string
) {
  db.runSync(
    `
    INSERT INTO incomes (amount, category, date, note)
    VALUES (?, ?, ?, ?)
    `,
    [amount, category, date, note ?? null]
  );
}

export function insertCategory(
  name: string,
  type: string,
  color?: string
) {
  db.runSync(
    `
    INSERT INTO categories (name, type, color)
    VALUES (?, ?, ?)
    `,
    [name, type, color ?? null]
  );
}

export function getExpenses() {
  return db.getAllSync(`
    SELECT * FROM expenses
    ORDER BY date DESC
  `);
}

export function getIncomes() {
  return db.getAllSync(`
    SELECT * FROM incomes
    ORDER BY date DESC
  `);
}

export function getCategories(): Array<{ id: number; name: string; type: string; color: string }> {
  return db.getAllSync(`
    SELECT * FROM categories
    ORDER BY name ASC
  `);
}

export function getCategoriesByType(type: string = 'income'): Array<{ id: number; name: string; type: string; color: string }> {
  return db.getAllSync(`
    SELECT * FROM categories WHERE type = ?
    ORDER BY name ASC
  `, [type]);
}

export function deleteExpense(id: number) {
  db.runSync(
    `DELETE FROM expenses WHERE id = ?`,
    [id]
  );
}

export function deleteIncome(id: number) {
  db.runSync(
    `DELETE FROM incomes WHERE id = ?`,
    [id]
  );
}

export function deleteCategory(id: number) {
  db.runSync(
    `DELETE FROM categories WHERE id = ?`,
    [id]
  );
}

export function getCategory(id: number) {
  return db.getAllSync(
    `SELECT * FROM categories WHERE id = ?`,
    [id]
  );
}

export function getCategoryByName(name: string, type: string = 'income') {
  return db.getAllSync(
    `SELECT * FROM categories WHERE name = ? AND type = ?`,
    [name, type]
  );
}