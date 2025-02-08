
const express = require("express")
const dotenv = require('dotenv');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.set('trust proxy', 1);

console.log("✅ Registering routes...");
app.use('/api', itemRoutes);

// ✅ Debug route (should work in browser)
app.get('/test', (req, res) => {
    res.send("✅ Test route is working!");
});

app.get('/', (req, res) => {
    res.send('Welcome to Street Style Store API!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
