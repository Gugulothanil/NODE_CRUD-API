const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());
//app.use(cors());

app.use('/api', itemRoutes);
app.use('/auth', authRoutes);

// ✅ Fix: Add a default route for '/'
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js CRUD API! 🎉');
});

app.get("/healthy", (req, res)=>{
    res.send("Ready to go!")
})

app.listen(process.env.PORT, () => console.log(`✅ Server running on port ${process.env.PORT}`));
