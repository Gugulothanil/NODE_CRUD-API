const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes'); // ✅ Ensure correct import

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.set('trust proxy', 1); // ✅ Required for Render

// ✅ Ensure this is correctly placed
app.use('/api', itemRoutes);

// ✅ Default Route (Avoids "Cannot GET /")
app.get('/', (req, res) => {
    res.send('Welcome to Street Style Store API!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
