const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  console.log("register API triggered");
  const { username, password } = req.body;
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new user into the "users" table
    db.run('INSERT INTO users (name, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        console.error("Error inserting user:", err.message);
        return res.status(500).json({ error: err.message });
      }
      // this.lastID contains the new user's ID
      res.status(201).json({ message: "User registered successfully!", userId: this.lastID });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login user and return JWT token
exports.login = async (req, res) => {
  console.log("login API triggered");
  const { username, password } = req.body;
  try {
    // Query the "users" table for a user with the provided username
    db.get('SELECT * FROM users WHERE name = ?', [username], async (err, row) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Compare the provided password with the stored hashed password
      const isValidPassword = await bcrypt.compare(password, row.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Generate a JWT token using JWT_SECRET from your .env file
      const token = jwt.sign({ id: row.id, username: row.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
