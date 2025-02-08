const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes'); // ✅ Ensure this is correct

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.set('trust proxy', 1);

console.log("✅ Registering routes...");
app.use('/api', itemRoutes);  // ✅ Ensure this registers routes under `/api`

app.get('/', (req, res) => {
    res.send('Welcome to Street Style Store API!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
