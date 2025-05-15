
import { Budget, Currency } from '../types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getCategoryName, formatCurrency } from '../utils/helpers';

interface BudgetListProps {
  budgets: Budget[];
  transactions: any[];
  currency: Currency;
  selectedMonth: number;
  selectedYear: number;
}

export const BudgetList = ({ budgets, transactions, currency, selectedMonth, selectedYear }: BudgetListProps) => {
  // Filter budgets for the selected month and year
  const filteredBudgets = budgets.filter(
    (budget) => budget.month === selectedMonth && budget.year === selectedYear
  );

  // Calculate spending for each category in the current month
  const calculateCategorySpending = (categoryId: string) => {
    return transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          t.type === 'expense' &&
          t.categoryId === categoryId &&
          transactionDate.getMonth() === selectedMonth &&
          transactionDate.getFullYear() === selectedYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  if (filteredBudgets.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No budgets set for this month.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-medium text-lg mb-4">Monthly Budgets</h3>
      <div className="space-y-4">
        {filteredBudgets.map((budget) => {
          const spent = calculateCategorySpending(budget.categoryId);
          const percentage = Math.min(100, Math.round((spent / budget.amount) * 100));
          const isOverBudget = spent > budget.amount;

          return (
            <div key={budget.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{getCategoryName(budget.categoryId)}</h4>
                <span className={isOverBudget ? "text-destructive font-medium" : ""}>
                  {formatCurrency(spent, currency)} / {formatCurrency(budget.amount, currency)}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className={`h-2 ${isOverBudget ? "bg-muted" : ""}`}
                indicatorClassName={isOverBudget ? "bg-destructive" : ""}
              />
              <p className="text-sm text-right mt-1 text-muted-foreground">
                {percentage}% {isOverBudget ? "Over budget!" : "used"}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
