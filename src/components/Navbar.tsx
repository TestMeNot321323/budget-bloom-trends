
import { useState } from 'react';
import { CurrencySelector } from './CurrencySelector';
import { Currency } from '../types';

interface NavbarProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const Navbar = ({ currency, setCurrency }: NavbarProps) => {
  return (
    <div className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold">BudgetTracker</h1>
        </div>
        <div className="flex items-center gap-4">
          <CurrencySelector currentCurrency={currency} setCurrency={setCurrency} />
        </div>
      </div>
    </div>
  );
};
