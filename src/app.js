const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const itemRoutes = require('./routes/itemRoutes');
const rateLimit = require('./middleware/rateLimit');

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(rateLimit);      // Apply rate limiting middleware

// ✅ Ensure this login route is correctly defined
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// ✅ Ensure API routes are registered AFTER login
app.use('/api', itemRoutes);

app.listen(process.env.PORT || 4000, () => 
  console.log(`Server running on port ${process.env.PORT || 4000}`)
);



