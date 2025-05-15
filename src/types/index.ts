
export type Currency = 'ZAR' | 'INR';

export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: TransactionType;
  categoryId: string;
  subcategoryId: string;
  date: string; // ISO string format
}

export interface MonthData {
  month: number; // 0-11
  year: number;
  income: number;
  expense: number;
  categories: {
    [categoryId: string]: number;
  };
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  month: number;
  year: number;
}
