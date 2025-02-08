const pool = require('../config/db'); // Ensure the database connection is imported

// ✅ Get all items
exports.getAllItems = async (req, res) => {
    try {
        console.log("✅ getAllItems function called"); // Debugging log
        const [rows] = await pool.query('SELECT * FROM items');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Create an item
exports.createItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const [result] = await pool.query(
            'INSERT INTO items (name, description, created_at) VALUES (?, ?, NOW())',
            [name, description]
        );
        res.status(201).json({ id: result.insertId, name, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Get a single item
exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Item not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Update an item
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await pool.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
        res.json({ id, name, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM items WHERE id = ?', [id]);
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
