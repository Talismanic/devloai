const { Pool } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
  // Connect to postgres database to create our application database
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // Connect to default postgres database
  });

  try {
    // Create the database if it doesn't exist
    await pool.query(`
      SELECT 'CREATE DATABASE ${process.env.DB_NAME}'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}')
    `);
    
    console.log(`Database ${process.env.DB_NAME} created or already exists`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await pool.end();
  }
};

const createTables = async () => {
  // Connect to our application database
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        verification_token VARCHAR(100),
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Users table created or already exists');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await pool.end();
  }
};

const initializeDatabase = async () => {
  try {
    await createDatabase();
    await createTables();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

// Run the initialization if this script is executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };