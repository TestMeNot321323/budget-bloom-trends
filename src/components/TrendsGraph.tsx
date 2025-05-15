
import { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Transaction, Currency } from '../types';
import { getMonthName, prepareMonthlyData } from '../utils/helpers';
import { currencySymbols } from '../data/mockData';
import { categories } from '../data/mockData';

interface TrendsGraphProps {
  transactions: Transaction[];
  chartType: 'overview' | 'categories';
  currency: Currency;
}

export const TrendsGraph = ({ transactions, chartType, currency }: TrendsGraphProps) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const monthlyData = prepareMonthlyData(transactions);
    
    if (chartType === 'overview') {
      // For income vs expenses chart
      setChartData(monthlyData.map(data => ({
        name: `${getMonthName(data.month).substring(0, 3)} ${data.year}`,
        Income: data.income,
        Expenses: data.expense,
      })));
    } else {
      // For category breakdown chart
      const expenseCategories = categories.filter(c => 
        !['cat_salary', 'cat_investments'].includes(c.id)
      );

      const data = monthlyData.map(monthData => {
        const result: any = {
          name: `${getMonthName(monthData.month).substring(0, 3)} ${monthData.year}`,
        };
        
        expenseCategories.forEach(category => {
          result[category.name] = monthData.categories[category.id] || 0;
        });
        
        return result;
      });
      
      setChartData(data);
    }
  }, [transactions, chartType]);

  if (chartData.length === 0) {
    return <div className="flex justify-center items-center h-64">No data available</div>;
  }

  // Custom tooltip formatter for the chart
  const formatTooltipValue = (value: number) => {
    return `${currencySymbols[currency]} ${value.toLocaleString()}`;
  };

  // Colors for categories
  const categoryColors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c",
    "#d0ed57", "#83a6ed", "#8dd1e1", "#0088FE", "#00C49F"
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `${currencySymbols[currency]} ${value}`} 
          />
          <Tooltip 
            formatter={formatTooltipValue}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          
          {chartType === 'overview' ? (
            <>
              <Line 
                type="monotone" 
                dataKey="Income" 
                stroke="#4ade80" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="Expenses" 
                stroke="#f87171" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </>
          ) : (
            <>
              {Object.keys(chartData[0])
                .filter(key => key !== 'name')
                .map((category, index) => (
                  <Line
                    key={category}
                    type="monotone"
                    dataKey={category}
                    stroke={categoryColors[index % categoryColors.length]}
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                ))}
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
