
import { Transaction, Budget, Category } from '../types';

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Transaction Methods
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_URL}/api/transactions`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction | null> => {
  try {
    const response = await fetch(`${API_URL}/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add transaction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding transaction:', error);
    return null;
  }
};

// Budget Methods
export const getBudgets = async (): Promise<Budget[]> => {
  try {
    const response = await fetch(`${API_URL}/api/budgets`);
    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return [];
  }
};

export const addBudget = async (budget: Omit<Budget, 'id'>): Promise<Budget | null> => {
  try {
    const response = await fetch(`${API_URL}/api/budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budget),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add budget');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding budget:', error);
    return null;
  }
};

// Categories Methods
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_URL}/api/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
