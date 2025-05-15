
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TransactionList } from './TransactionList';
import { TrendsGraph } from './TrendsGraph';
import { TransactionForm } from './TransactionForm';
import { MonthSelector } from './MonthSelector';
import { Transaction, Currency, Budget } from '../types';
import { calculateTotals, filterTransactionsByMonth, formatCurrency } from '../utils/helpers';
import { BudgetForm } from './BudgetForm';
import { BudgetList } from './BudgetList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardProps {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  currency: Currency;
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
}

export const Dashboard = ({ transactions, setTransactions, currency, budgets, setBudgets }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showForm, setShowForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredTransactions = filterTransactionsByMonth(
    transactions,
    selectedMonth,
    selectedYear
  );

  const { income, expense } = calculateTotals(filteredTransactions);
  const balance = income - expense;

  const handleAddBudget = (budget: Budget) => {
    setBudgets([...budgets, budget]);
    setShowBudgetForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Financial Overview</h2>
        <div className="flex items-center gap-4">
          <MonthSelector
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onSelect={(month, year) => {
              setSelectedMonth(month);
              setSelectedYear(year);
            }}
          />
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : 'Add Transaction'}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8">
          <TransactionForm
            onAddTransaction={(transaction) => {
              setTransactions([...transactions, transaction]);
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={`p-6 card-hover ${balance >= 0 ? 'border-l-4 border-budget-income' : 'border-l-4 border-budget-expense'}`}>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Balance</h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-budget-income' : 'text-budget-expense'}`}>
            {formatCurrency(balance, currency)}
          </p>
        </Card>
        <Card className="p-6 card-hover border-l-4 border-budget-income">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Income</h3>
          <p className="text-2xl font-bold text-budget-income">{formatCurrency(income, currency)}</p>
        </Card>
        <Card className="p-6 card-hover border-l-4 border-budget-expense">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-budget-expense">{formatCurrency(expense, currency)}</p>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          {activeTab === 'budgets' && (
            <Button onClick={() => setShowBudgetForm(!showBudgetForm)} variant="outline">
              {showBudgetForm ? 'Close Form' : 'Add Budget'}
            </Button>
          )}
        </div>

        <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Income vs Expenses</h3>
            <TrendsGraph 
              transactions={transactions} 
              chartType="overview" 
              currency={currency}
            />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Expenses by Category</h3>
            <TrendsGraph 
              transactions={transactions} 
              chartType="categories" 
              currency={currency}
            />
          </Card>
        </TabsContent>

        <TabsContent value="budgets">
          {showBudgetForm && (
            <div className="mb-6">
              <BudgetForm 
                onAddBudget={handleAddBudget}
                existingBudgets={budgets}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            </div>
          )}
          <BudgetList 
            budgets={budgets}
            transactions={transactions}
            currency={currency}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">
              Transactions for {new Date(selectedYear, selectedMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <TransactionList 
              transactions={filteredTransactions} 
              currency={currency} 
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
