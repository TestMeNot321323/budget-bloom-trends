
import { Currency } from '../types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface CurrencySelectorProps {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const CurrencySelector = ({ currentCurrency, setCurrency }: CurrencySelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>{currentCurrency}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setCurrency('ZAR')}>
          ZAR (South African Rand)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency('INR')}>
          INR (Indian Rupee)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
