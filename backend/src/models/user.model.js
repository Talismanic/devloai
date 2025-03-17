const db = require('../utils/db');
const bcrypt = require('bcrypt');

class User {
  static async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.random().toString(36).substring(2, 15) + 
                             Math.random().toString(36).substring(2, 15);
    
    const query = `
      INSERT INTO users (name, email, password, verification_token, is_verified)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, is_verified
    `;
    
    const values = [name, email, hashedPassword, verificationToken, false];
    
    try {
      const result = await db.query(query, values);
      return { ...result.rows[0], verificationToken };
    } catch (error) {
      if (error.code === '23505') { // Unique violation error code
        throw new Error('User with this email already exists');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async verifyUser(token) {
    const query = `
      UPDATE users
      SET is_verified = true, verification_token = NULL
      WHERE verification_token = $1
      RETURNING id, name, email, is_verified
    `;
    
    const result = await db.query(query, [token]);
    
    if (result.rowCount === 0) {
      throw new Error('Invalid verification token');
    }
    
    return result.rows[0];
  }

  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

module.exports = User;