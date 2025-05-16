
import { Pool } from 'pg';
import { Transaction, Budget, Category, Subcategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Connection configuration
const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL,
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Transaction Methods
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const result = await pool.query(`
      SELECT * FROM transactions 
      ORDER BY date DESC
    `);
    
    return result.rows.map(row => ({
      id: row.id,
      amount: parseFloat(row.amount),
      description: row.description,
      type: row.type as 'income' | 'expense',
      categoryId: row.category_id,
      subcategoryId: row.subcategory_id,
      date: row.date
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction | null> => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO transactions 
       (id, amount, description, type, category_id, subcategory_id, date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        id,
        transaction.amount,
        transaction.description,
        transaction.type,
        transaction.categoryId,
        transaction.subcategoryId,
        transaction.date
      ]
    );
    
    const row = result.rows[0];
    return {
      id: row.id,
      amount: parseFloat(row.amount),
      description: row.description,
      type: row.type as 'income' | 'expense',
      categoryId: row.category_id,
      subcategoryId: row.subcategory_id,
      date: row.date
    };
  } catch (error) {
    console.error('Error adding transaction:', error);
    return null;
  }
};

// Budget Methods
export const getBudgets = async (): Promise<Budget[]> => {
  try {
    const result = await pool.query(`
      SELECT * FROM budgets
      ORDER BY year DESC, month DESC
    `);
    
    return result.rows.map(row => ({
      id: row.id,
      categoryId: row.category_id,
      amount: parseFloat(row.amount),
      month: row.month,
      year: row.year
    }));
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return [];
  }
};

export const addBudget = async (budget: Omit<Budget, 'id'>): Promise<Budget | null> => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO budgets 
       (id, category_id, amount, month, year) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, budget.categoryId, budget.amount, budget.month, budget.year]
    );
    
    const row = result.rows[0];
    return {
      id: row.id,
      categoryId: row.category_id,
      amount: parseFloat(row.amount),
      month: row.month,
      year: row.year
    };
  } catch (error) {
    console.error('Error adding budget:', error);
    return null;
  }
};

// Categories Methods
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Get all categories
    const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY name');
    
    // Get all subcategories
    const subcategoriesResult = await pool.query('SELECT * FROM subcategories ORDER BY name');
    
    // Map subcategories to their parent categories
    const subcategoriesByCategory: Record<string, Subcategory[]> = {};
    subcategoriesResult.rows.forEach(sub => {
      if (!subcategoriesByCategory[sub.category_id]) {
        subcategoriesByCategory[sub.category_id] = [];
      }
      subcategoriesByCategory[sub.category_id].push({
        id: sub.id,
        name: sub.name
      });
    });
    
    // Create final categories array with their subcategories
    return categoriesResult.rows.map(cat => ({
      id: cat.id,
      name: cat.name,
      subcategories: subcategoriesByCategory[cat.id] || []
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
