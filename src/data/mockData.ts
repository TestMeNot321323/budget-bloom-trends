
import { Category, Transaction } from '../types';

export const categories: Category[] = [
  {
    id: 'cat_housing',
    name: 'Housing',
    subcategories: [
      { id: 'sub_rent', name: 'Rent' },
      { id: 'sub_mortgage', name: 'Mortgage' },
      { id: 'sub_utilities', name: 'Utilities' },
      { id: 'sub_maintenance', name: 'Maintenance' }
    ]
  },
  {
    id: 'cat_food',
    name: 'Food',
    subcategories: [
      { id: 'sub_groceries', name: 'Groceries' },
      { id: 'sub_dining', name: 'Dining Out' },
      { id: 'sub_delivery', name: 'Food Delivery' }
    ]
  },
  {
    id: 'cat_transport',
    name: 'Transportation',
    subcategories: [
      { id: 'sub_fuel', name: 'Fuel' },
      { id: 'sub_public', name: 'Public Transit' },
      { id: 'sub_maintenance', name: 'Car Maintenance' },
      { id: 'sub_rideshare', name: 'Rideshare' }
    ]
  },
  {
    id: 'cat_entertainment',
    name: 'Entertainment',
    subcategories: [
      { id: 'sub_streaming', name: 'Streaming Services' },
      { id: 'sub_events', name: 'Events & Movies' },
      { id: 'sub_hobbies', name: 'Hobbies' }
    ]
  },
  {
    id: 'cat_health',
    name: 'Health',
    subcategories: [
      { id: 'sub_insurance', name: 'Insurance' },
      { id: 'sub_medical', name: 'Medical Expenses' },
      { id: 'sub_fitness', name: 'Fitness' }
    ]
  },
  {
    id: 'cat_salary',
    name: 'Salary',
    subcategories: [
      { id: 'sub_primary', name: 'Primary Job' },
      { id: 'sub_side', name: 'Side Hustle' },
      { id: 'sub_bonus', name: 'Bonus' }
    ]
  },
  {
    id: 'cat_investments',
    name: 'Investments',
    subcategories: [
      { id: 'sub_dividends', name: 'Dividends' },
      { id: 'sub_interest', name: 'Interest' },
      { id: 'sub_capital', name: 'Capital Gains' }
    ]
  },
  {
    id: 'cat_misc',
    name: 'Miscellaneous',
    subcategories: [
      { id: 'sub_gifts', name: 'Gifts' },
      { id: 'sub_other', name: 'Other' }
    ]
  }
];

// Generate random transactions for the past 6 months
const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  // Go back 6 months
  for (let m = 0; m < 6; m++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - m, 1);
    
    // Generate 10-20 transactions per month
    const transactionCount = Math.floor(Math.random() * 11) + 10;
    
    for (let i = 0; i < transactionCount; i++) {
      // Random day in the month
      const day = Math.floor(Math.random() * 28) + 1;
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      
      // Determine if it's income or expense (25% chance of income)
      const type = Math.random() < 0.25 ? 'income' : 'expense';
      
      // Select appropriate categories based on type
      let categoryPool: Category[];
      if (type === 'income') {
        categoryPool = categories.filter(c => ['cat_salary', 'cat_investments', 'cat_misc'].includes(c.id));
      } else {
        categoryPool = categories.filter(c => !['cat_salary', 'cat_investments'].includes(c.id));
      }
      
      const category = categoryPool[Math.floor(Math.random() * categoryPool.length)];
      const subcategory = category.subcategories[Math.floor(Math.random() * category.subcategories.length)];
      
      // Generate amount (income is typically larger)
      const baseAmount = type === 'income' ? 
        Math.floor(Math.random() * 20000) + 5000 : 
        Math.floor(Math.random() * 2000) + 50;
      
      transactions.push({
        id: `trans_${date.getTime()}_${i}`,
        amount: baseAmount,
        description: `${type === 'income' ? 'Monthly income' : category.name} - ${subcategory.name}`,
        type,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        date: date.toISOString()
      });
    }
  }
  
  return transactions;
};

export const transactions: Transaction[] = generateTransactions();

export const currencySymbols = {
  ZAR: 'R',
  INR: '₹'
};
