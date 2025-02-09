const pool = require('../config/db');

exports.getAllItems = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json(rows);
};

exports.createItem = async (req, res) => {
    const { name, description } = req.body;
    const [result] = await pool.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ id: result.insertId, name, description });
};

exports.getItemById = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Item not found" });
    res.json(rows[0]);
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    await pool.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    res.json({ id, name, description });
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM items WHERE id = ?', [id]);
    res.json({ message: "Item deleted successfully" });
};
