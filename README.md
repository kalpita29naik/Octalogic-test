# Vehicle Rental System - Octalogic-test

This project is part of the Octalogic test.

# Tech Stack

- **Backend**: Node.js, Express.js, Sequelize ORM
- **Frontend**: React.js (Material UI + Tailwind CSS)
- **Database**: PostgreSQL

# Steps to setup the project

### 1.Clone the repository

```bash
git clone https://github.com/kalpita29naik/Octalogic-test.git
cd Octalogic-test
```

### 2. Install dependencies for both backend and frontend

# Backend

```bash
cd backend
npm install
```

# Frontend

```bash
cd frontend
npm install
```

### 3. Creating .env file

Create a `.env` file in the `backend` folder and add the following environment variables:

```env
DB_HOST = localhost
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = your_password
DB_NAME = rental-system
PORT = 5000
```

### 4.Database Setup

# Run Migration

```bash
cd backend
npx sequelize-cli db:migrate
```

# Run Seed

```bash
cd backend
npx sequelize-cli db:seed:all
```

### 5. Run the Project

# Backend

```bash
cd backend
node index.js
```

# Frontend

```bash
cd frontend
npm start
```
