const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db/DatabaseService');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable
const SALT_ROUNDS = 10;

class AuthService {
  async register(username, password) {
    // Validate input
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in database
    const result = await db.createUser({
      username,
      hashedPassword
    });

    // Generate JWT token
    const token = this.generateToken(result.id);

    return {
      userId: result.id,
      token
    };
  }

  async login(username, password) {
    const user = await db.getUserByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid username or password');
    }

    const token = this.generateToken(user._id);

    return {
      userId: user._id,
      token
    };
  }

  generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '24h'
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async getUserFromToken(token) {
    const decoded = this.verifyToken(token);
    return db.getUserById(decoded.userId);
  }
}

module.exports = new AuthService();
