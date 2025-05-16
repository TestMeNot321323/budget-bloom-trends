
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Routes
app.get('/api/transactions', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM transactions 
      ORDER BY date DESC
    `);
    
    const transactions = result.rows.map(row => ({
      id: row.id,
      amount: parseFloat(row.amount),
      description: row.description,
      type: row.type,
      categoryId: row.category_id,
      subcategoryId: row.subcategory_id,
      date: row.date
    }));
    
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.post('/api/transactions', async (req, res) => {
  const { amount, description, type, categoryId, subcategoryId, date } = req.body;
  const id = uuidv4();
  
  try {
    const result = await pool.query(
      `INSERT INTO transactions 
       (id, amount, description, type, category_id, subcategory_id, date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, amount, description, type, categoryId, subcategoryId, date]
    );
    
    const row = result.rows[0];
    res.status(201).json({
      id: row.id,
      amount: parseFloat(row.amount),
      description: row.description,
      type: row.type,
      categoryId: row.category_id,
      subcategoryId: row.subcategory_id,
      date: row.date
    });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

app.get('/api/budgets', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM budgets
      ORDER BY year DESC, month DESC
    `);
    
    const budgets = result.rows.map(row => ({
      id: row.id,
      categoryId: row.category_id,
      amount: parseFloat(row.amount),
      month: row.month,
      year: row.year
    }));
    
    res.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
});

app.post('/api/budgets', async (req, res) => {
  const { categoryId, amount, month, year } = req.body;
  const id = uuidv4();
  
  try {
    const result = await pool.query(
      `INSERT INTO budgets 
       (id, category_id, amount, month, year) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, categoryId, amount, month, year]
    );
    
    const row = result.rows[0];
    res.status(201).json({
      id: row.id,
      categoryId: row.category_id,
      amount: parseFloat(row.amount),
      month: row.month,
      year: row.year
    });
  } catch (error) {
    console.error('Error adding budget:', error);
    res.status(500).json({ error: 'Failed to add budget' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    // Get all categories
    const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY name');
    
    // Get all subcategories
    const subcategoriesResult = await pool.query('SELECT * FROM subcategories ORDER BY name');
    
    // Map subcategories to their parent categories
    const subcategoriesByCategory = {};
    subcategoriesResult.rows.forEach(sub => {
      if (!subcategoriesByCategory[sub.category_id]) {
        subcategoriesByCategory[sub.category_id] = [];
      }
      subcategoriesByCategory[sub.category_id].push({
        id: sub.id,
        name: sub.name
      });
    });
    
    // Create final categories array with their subcategories
    const categories = categoriesResult.rows.map(cat => ({
      id: cat.id,
      name: cat.name,
      subcategories: subcategoriesByCategory[cat.id] || []
    }));
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
