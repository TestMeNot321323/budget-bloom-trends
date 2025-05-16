
# Budget Tracker App with Docker and PostgreSQL

A budget tracking application with persistent storage using PostgreSQL and Docker.

## Features

- Track income and expenses
- Create and monitor budgets
- View financial trends over time
- Categorize transactions
- Dockerized application and database

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm (for local development)

## Quick Start

1. Clone the repository
2. Run the application with Docker Compose:

```bash
# Make the run script executable
chmod +x run.sh

# Start the application
./run.sh
```

3. Access the application at http://localhost

## Development Setup

To run the application locally for development:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Database Structure

The PostgreSQL database contains the following tables:
- categories
- subcategories
- transactions
- budgets

## Environment Variables

- `VITE_DATABASE_URL`: PostgreSQL connection string (set automatically by Docker Compose)

## License

MIT
