
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Dashboard } from '../components/Dashboard';
import { transactions as mockTransactions } from '../data/mockData';
import { Transaction, Currency } from '../types';

const Index = () => {
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar currency={currency} setCurrency={setCurrency} />
      <div className="flex-grow">
        <Dashboard 
          transactions={transactions} 
          setTransactions={setTransactions} 
          currency={currency} 
        />
      </div>
      <footer className="py-4 border-t text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          Budget Tracker App &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
