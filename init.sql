
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS subcategories (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL REFERENCES categories(id),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(50) PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    type VARCHAR(10) NOT NULL,
    category_id VARCHAR(50) NOT NULL REFERENCES categories(id),
    subcategory_id VARCHAR(50) NOT NULL REFERENCES subcategories(id),
    date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS budgets (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL REFERENCES categories(id),
    amount DECIMAL(10,2) NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories and subcategories
INSERT INTO categories (id, name) VALUES 
('cat_housing', 'Housing'),
('cat_food', 'Food'),
('cat_transport', 'Transportation'),
('cat_entertainment', 'Entertainment'),
('cat_health', 'Health'),
('cat_salary', 'Salary'),
('cat_investments', 'Investments'),
('cat_misc', 'Miscellaneous');

-- Housing subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_rent', 'cat_housing', 'Rent'),
('sub_mortgage', 'cat_housing', 'Mortgage'),
('sub_utilities', 'cat_housing', 'Utilities'),
('sub_maintenance', 'cat_housing', 'Maintenance');

-- Food subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_groceries', 'cat_food', 'Groceries'),
('sub_dining', 'cat_food', 'Dining Out'),
('sub_delivery', 'cat_food', 'Food Delivery');

-- Transportation subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_fuel', 'cat_transport', 'Fuel'),
('sub_public', 'cat_transport', 'Public Transit'),
('sub_maintenance', 'cat_transport', 'Car Maintenance'),
('sub_rideshare', 'cat_transport', 'Rideshare');

-- Entertainment subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_streaming', 'cat_entertainment', 'Streaming Services'),
('sub_events', 'cat_entertainment', 'Events & Movies'),
('sub_hobbies', 'cat_entertainment', 'Hobbies');

-- Health subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_insurance', 'cat_health', 'Insurance'),
('sub_medical', 'cat_health', 'Medical Expenses'),
('sub_fitness', 'cat_health', 'Fitness');

-- Salary subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_primary', 'cat_salary', 'Primary Job'),
('sub_side', 'cat_salary', 'Side Hustle'),
('sub_bonus', 'cat_salary', 'Bonus');

-- Investments subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_dividends', 'cat_investments', 'Dividends'),
('sub_interest', 'cat_investments', 'Interest'),
('sub_capital', 'cat_investments', 'Capital Gains');

-- Miscellaneous subcategories
INSERT INTO subcategories (id, category_id, name) VALUES 
('sub_gifts', 'cat_misc', 'Gifts'),
('sub_other', 'cat_misc', 'Other');
