
import { Category, Currency, MonthData, Transaction } from "../types";
import { categories, currencySymbols } from "../data/mockData";

// Format amount with currency symbol
export const formatCurrency = (amount: number, currency: Currency): string => {
  return `${currencySymbols[currency]} ${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

// Get category name by ID
export const getCategoryName = (categoryId: string): string => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : 'Unknown';
};

// Get subcategory name by ID
export const getSubcategoryName = (categoryId: string, subcategoryId: string): string => {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return 'Unknown';
  
  const subcategory = category.subcategories.find(s => s.id === subcategoryId);
  return subcategory ? subcategory.name : 'Unknown';
};

// Filter transactions for a specific month and year
export const filterTransactionsByMonth = (
  transactions: Transaction[], 
  month: number, 
  year: number
): Transaction[] => {
  return transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

// Calculate totals for a set of transactions
export const calculateTotals = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.income += transaction.amount;
    } else {
      acc.expense += transaction.amount;
    }
    return acc;
  }, { income: 0, expense: 0 });
};

// Prepare data for charts - monthly breakdown
export const prepareMonthlyData = (transactions: Transaction[]): MonthData[] => {
  // Get unique months from transactions
  const months = new Set<string>();
  transactions.forEach(t => {
    const date = new Date(t.date);
    months.add(`${date.getFullYear()}-${date.getMonth()}`);
  });
  
  // Sort months
  const sortedMonths = Array.from(months)
    .map(m => {
      const [year, month] = m.split('-').map(Number);
      return { year, month };
    })
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
  
  // Calculate data for each month
  return sortedMonths.map(({ month, year }) => {
    const monthTransactions = filterTransactionsByMonth(transactions, month, year);
    const { income, expense } = calculateTotals(monthTransactions);
    
    // Calculate expenses by category
    const categoryExpenses: { [categoryId: string]: number } = {};
    monthTransactions.forEach(t => {
      if (t.type === 'expense') {
        if (!categoryExpenses[t.categoryId]) {
          categoryExpenses[t.categoryId] = 0;
        }
        categoryExpenses[t.categoryId] += t.amount;
      }
    });
    
    return {
      month,
      year,
      income,
      expense,
      categories: categoryExpenses
    };
  });
};

// Get month name from number (0-11)
export const getMonthName = (monthNum: number): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[monthNum] || 'Unknown';
};

// Generate date options for month selector (last 12 months)
export const generateDateOptions = (): { month: number; year: number; label: string }[] => {
  const options = [];
  const now = new Date();
  
  for (let i = 0; i < 12; i++) {
    const month = now.getMonth() - i;
    let year = now.getFullYear();
    
    // Adjust for negative months
    if (month < 0) {
      year--;
      const adjustedMonth = 12 + month;
      options.push({ 
        month: adjustedMonth, 
        year, 
        label: `${getMonthName(adjustedMonth)} ${year}` 
      });
    } else {
      options.push({ 
        month, 
        year, 
        label: `${getMonthName(month)} ${year}` 
      });
    }
  }
  
  return options;
};

// Format date from ISO string to display format
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
