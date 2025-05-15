
import { Transaction, Currency } from '../types';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  formatCurrency, 
  formatDate, 
  getCategoryName, 
  getSubcategoryName 
} from '../utils/helpers';

interface TransactionListProps {
  transactions: Transaction[];
  currency: Currency;
}

export const TransactionList = ({ transactions, currency }: TransactionListProps) => {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        {sortedTransactions.length === 0 && (
          <TableCaption>No transactions found for the selected period.</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{getCategoryName(transaction.categoryId)}</TableCell>
              <TableCell>{getSubcategoryName(transaction.categoryId, transaction.subcategoryId)}</TableCell>
              <TableCell 
                className={`text-right font-medium ${transaction.type === 'income' ? 'text-budget-income' : 'text-budget-expense'}`}
              >
                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount, currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
