
import { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { CategorySelector } from './CategorySelector';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const { toast } = useToast();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive"
      });
      return;
    }

    if (!description) {
      toast({
        title: "Missing description",
        description: "Please enter a description for the transaction.",
        variant: "destructive"
      });
      return;
    }

    if (!categoryId || !subcategoryId) {
      toast({
        title: "Missing category",
        description: "Please select a category and subcategory.",
        variant: "destructive"
      });
      return;
    }

    const transaction: Transaction = {
      id: `trans_${Date.now()}`,
      amount: parseFloat(amount),
      description,
      type,
      categoryId,
      subcategoryId,
      date: new Date().toISOString()
    };

    onAddTransaction(transaction);
    toast({
      title: `${type === 'income' ? 'Income' : 'Expense'} added`,
      description: "Your transaction has been added successfully.",
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategoryId('');
    setSubcategoryId('');
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">Add New Transaction</h3>
      
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="radio"
                id="expense"
                name="type"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
                className="peer hidden"
              />
              <Label 
                htmlFor="expense" 
                className={`inline-flex items-center justify-center rounded-md px-4 py-2 cursor-pointer ${
                  type === 'expense' 
                    ? 'bg-budget-expense text-white' 
                    : 'border hover:bg-muted'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>
                Expense
              </Label>
            </div>
            
            <div>
              <input
                type="radio"
                id="income"
                name="type"
                checked={type === 'income'}
                onChange={() => setType('income')}
                className="peer hidden"
              />
              <Label 
                htmlFor="income" 
                className={`inline-flex items-center justify-center rounded-md px-4 py-2 cursor-pointer ${
                  type === 'income' 
                    ? 'bg-budget-income text-white' 
                    : 'border hover:bg-muted'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Income
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <CategorySelector
          transactionType={type}
          onCategoryChange={setCategoryId}
          onSubcategoryChange={setSubcategoryId}
          selectedCategoryId={categoryId}
          selectedSubcategoryId={subcategoryId}
        />

        <Button type="submit" className="w-full md:w-auto md:self-end mt-2">
          Add Transaction
        </Button>
      </form>
    </Card>
  );
};
