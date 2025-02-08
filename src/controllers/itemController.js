const db = require('../models/db');

exports.createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const [items] = await db.execute('SELECT * FROM items');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const [items] = await db.execute('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (items.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(items[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    await db.execute('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id]);
    res.json({ message: 'Item updated' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await db.execute('DELETE FROM items WHERE id = ?', [req.params.id]);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};
