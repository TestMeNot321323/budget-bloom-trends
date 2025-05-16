
#!/bin/bash

# Build and start the containers
echo "Building and starting containers..."
docker compose up --build -d

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 5

echo "Budget Tracker app is running!"
echo "Access the application at http://localhost"
echo "PostgreSQL database is running on localhost:5432"
echo ""
echo "To stop the application, run: docker compose down"
