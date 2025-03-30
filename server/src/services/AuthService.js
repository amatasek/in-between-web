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
    const user = await db.createUser({
      username,
      hashedPassword
    });

    // Generate JWT token
    const token = await this.generateToken(user._id);

    return {
      user: { 
        id: user._id, 
        username: user.username,
        balance: user.balance || 0
      },
      token
    };
  }

  async login(username, password) {
    console.log('[AUTH] Login attempt:', { username });
    
    const user = await db.getUserByUsername(username);
    if (!user) {
      console.log('[AUTH] User not found:', { username });
      throw new Error('Invalid username or password');
    }

    console.log('[AUTH] User found:', { 
      username,
      hasPassword: !!user.password,
      storedPassword: user.password
    });

    if (!user.password) {
      console.log('[AUTH] No password set for user:', { username });
      throw new Error('Invalid username or password');
    }

    console.log('[AUTH] Comparing passwords:', {
      providedPassword: password,
      storedHashedPassword: user.password
    });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('[AUTH] Invalid password for user:', { username });
      throw new Error('Invalid username or password');
    }

    const token = await this.generateToken(user._id);
    console.log('[AUTH] Login successful:', { 
      username, 
      userId: user._id,
      balance: user.balance || 0
    });

    return {
      user: { 
        id: user._id, 
        username: user.username,
        balance: user.balance || 0
      },
      token
    };
  }

  async generateToken(userId) {
    // Get full user info to include in token
    const user = await db.getUserById(userId);
    if (!user) throw new Error('User not found');
    
    return jwt.sign({ 
      userId,
      username: user.username
    }, JWT_SECRET, {
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
