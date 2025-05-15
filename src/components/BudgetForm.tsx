
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Budget, Category } from '../types';
import { categories } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

interface BudgetFormProps {
  onAddBudget: (budget: Budget) => void;
  existingBudgets: Budget[];
  selectedMonth: number;
  selectedYear: number;
}

export const BudgetForm = ({ onAddBudget, existingBudgets, selectedMonth, selectedYear }: BudgetFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      categoryId: '',
      amount: 0,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Check if budget already exists for this category and month
    const existingBudget = existingBudgets.find(
      (b) => b.categoryId === data.categoryId && b.month === selectedMonth && b.year === selectedYear
    );

    if (existingBudget) {
      toast({
        title: "Budget already exists",
        description: "A budget for this category already exists for the selected month.",
        variant: "destructive"
      });
      return;
    }

    const newBudget: Budget = {
      id: crypto.randomUUID(),
      categoryId: data.categoryId,
      amount: data.amount,
      month: selectedMonth,
      year: selectedYear,
    };

    onAddBudget(newBudget);
    toast({
      title: "Budget added",
      description: "Your budget has been successfully added.",
    });
    form.reset();
  });

  // Filter categories to only show expense categories
  const expenseCategories = categories.filter((category) => {
    // Assuming categories with id starting with 'e' are expenses
    return category.id.startsWith('e');
  });

  return (
    <Card className="p-6">
      <h3 className="font-medium text-lg mb-4">Add Budget for {new Date(selectedYear, selectedMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h3>
      
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select 
                    className="w-full px-3 py-2 border rounded-md" 
                    {...field}
                  >
                    <option value="">Select a category</option>
                    {expenseCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Amount</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Add Budget
          </Button>
        </form>
      </Form>
    </Card>
  );
};
