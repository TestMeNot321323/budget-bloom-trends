
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Dashboard } from '../components/Dashboard';
import { transactions as mockTransactions } from '../data/mockData';
import { Transaction, Currency, Budget } from '../types';
import { TooltipProvider } from '@/components/ui/tooltip';

const Index = () => {
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar currency={currency} setCurrency={setCurrency} />
        <div className="flex-grow">
          <Dashboard 
            transactions={transactions} 
            setTransactions={setTransactions} 
            currency={currency}
            budgets={budgets}
            setBudgets={setBudgets}
          />
        </div>
        <footer className="py-4 border-t text-center text-sm text-muted-foreground">
          <div className="container mx-auto">
            Budget Tracker App &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default Index;
