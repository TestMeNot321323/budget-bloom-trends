
#!/bin/bash

# Build and start the containers
echo "Building and starting containers..."
docker compose up --build -d

# Wait for the database and backend to be ready
echo "Waiting for services to be ready..."
sleep 10

echo "Budget Tracker app is running!"
echo "Access the application at http://localhost"
echo "Backend API is running at http://localhost:3000"
echo "PostgreSQL database is running on localhost:5432"
echo ""
echo "To stop the application, run: docker compose down"
