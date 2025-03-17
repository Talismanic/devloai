# Authentication System

A complete authentication system with signup, email verification, and login functionality.

## Features

- User registration with email and password
- Email verification via verification link
- User login with email and password
- Welcome page for authenticated users
- PostgreSQL database integration
- Secure password hashing
- JWT authentication

## Project Structure

```
├── backend/             # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utility functions
│   │   └── index.js     # Entry point
│   ├── .env             # Environment variables
│   └── package.json     # Dependencies
│
└── frontend/            # React frontend
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   ├── App.js       # Main component
    │   ├── App.css      # Styles
    │   └── index.js     # Entry point
    └── package.json     # Dependencies
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- SMTP email service (e.g., Gmail)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables in `.env` file:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=auth_db
   JWT_SECRET=your_jwt_secret_key
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `POST /api/auth/signup` - Register a new user
- `GET /api/auth/verify/:token` - Verify user email
- `POST /api/auth/login` - Authenticate user

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  verification_token VARCHAR(100),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```