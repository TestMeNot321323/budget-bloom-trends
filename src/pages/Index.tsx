
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Dashboard } from '../components/Dashboard';
import { Transaction, Currency, Budget } from '../types';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getTransactions, getBudgets, getCategories } from '../services/db';
import { useToast } from '@/components/ui/use-toast';
import { categories as mockCategories } from '../data/mockData';

const Index = () => {
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Try to get data from database
        const [transactionsData, budgetsData] = await Promise.all([
          getTransactions(),
          getBudgets()
        ]);
        
        setTransactions(transactionsData);
        setBudgets(budgetsData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error loading data",
          description: "Using mock data instead. Check your database connection.",
          variant: "destructive"
        });
        
        // Fallback to mock data if database fails
        import('../data/mockData').then(({ transactions: mockTransactions }) => {
          setTransactions(mockTransactions);
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [toast]);
  
  const handleUpdateTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
  };
  
  const handleUpdateBudgets = (newBudgets: Budget[]) => {
    setBudgets(newBudgets);
  };
  
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar currency={currency} setCurrency={setCurrency} />
        <div className="flex-grow">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
              </div>
            </div>
          ) : (
            <Dashboard 
              transactions={transactions} 
              setTransactions={handleUpdateTransactions} 
              currency={currency}
              budgets={budgets}
              setBudgets={handleUpdateBudgets}
            />
          )}
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
