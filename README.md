# AccessHub

A simple task management app where you can sign up, log in, and manage your tasks.

## Tech Stack
- **Backend**: Node.js, Express, Prisma (ORM), PostgreSQL.
- **Frontend**: React, Vite.

## Features
- Create account (User or Admin role).
- Login with email/password.
- **User**: Manage your own tasks.
- **Admin**: See everyone's tasks.
- Auto-logout when session expires.

## How to Run

### 1. Setup Backend
Open a terminal in the `Backend` folder:
```bash
# Install packages
npm install

# Setup database
npx prisma generate
npx prisma migrate dev

# Start server
npm run dev
```
Note: Make sure your `.env` file has the `DATABASE_URL` and `JWT_SECRET`.

### 2. Setup Frontend
Open a new terminal in the `Frontend` folder:
```bash
# Install packages
npm install

# Start React app 
npm run dev
```

### 3. Open App
Go to `http://localhost:5173` in your browser.

## API Docs
You can see the API documentation at `http://localhost:5000/api-docs` when the backend is running.
