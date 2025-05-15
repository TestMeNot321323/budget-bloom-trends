
import { useEffect, useState } from 'react';
import { Category, Subcategory } from '../types';
import { categories } from '../data/mockData';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';

interface CategorySelectorProps {
  transactionType: 'income' | 'expense';
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
  selectedCategoryId?: string;
  selectedSubcategoryId?: string;
}

export const CategorySelector = ({
  transactionType,
  onCategoryChange,
  onSubcategoryChange,
  selectedCategoryId,
  selectedSubcategoryId
}: CategorySelectorProps) => {
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Filter categories based on transaction type
    if (transactionType === 'income') {
      setFilteredCategories(categories.filter(c => 
        ['cat_salary', 'cat_investments', 'cat_misc'].includes(c.id)
      ));
    } else {
      setFilteredCategories(categories.filter(c => 
        !['cat_salary', 'cat_investments'].includes(c.id)
      ));
    }
  }, [transactionType]);

  useEffect(() => {
    if (selectedCategoryId) {
      const category = categories.find(c => c.id === selectedCategoryId) || null;
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [selectedCategoryId]);

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
    
    // Find the selected category
    const category = categories.find(c => c.id === value);
    if (category) {
      setSelectedCategory(category);
      // Auto-select first subcategory
      if (category.subcategories.length > 0) {
        onSubcategoryChange(category.subcategories[0].id);
      }
    }
  };

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select 
          value={selectedCategoryId} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div>
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select
            value={selectedSubcategoryId}
            onValueChange={onSubcategoryChange}
          >
            <SelectTrigger id="subcategory">
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategory.subcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
