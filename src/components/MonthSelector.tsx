
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { generateDateOptions } from '../utils/helpers';

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onSelect: (month: number, year: number) => void;
}

export const MonthSelector = ({ selectedMonth, selectedYear, onSelect }: MonthSelectorProps) => {
  const dateOptions = generateDateOptions();
  
  const currentSelection = dateOptions.find(
    option => option.month === selectedMonth && option.year === selectedYear
  );
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span>{currentSelection?.label || 'Select Month'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
        {dateOptions.map(option => (
          <DropdownMenuItem
            key={`${option.month}-${option.year}`}
            onClick={() => onSelect(option.month, option.year)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
