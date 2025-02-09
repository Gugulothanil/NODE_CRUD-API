const db = require('../config/db');
const util = require('util');

// Promisify db.all and db.get for SELECT queries
const dbAll = util.promisify(db.all).bind(db);
const dbGet = util.promisify(db.get).bind(db);

// Wrap db.run in a promise for INSERT/UPDATE/DELETE queries
function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this); // 'this' contains lastID and changes
    });
  });
}

// GET all items
exports.getAllItems = async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new item
exports.createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await dbRun(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ id: result.lastID, name, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const row = await dbGet('SELECT * FROM items WHERE id = ?', [id]);
    if (!row) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(row);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE an item
exports.updateItem = async (req, res) => {
    
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await dbRun(
      'UPDATE items SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ message: "Item not found or no changes made" });
    }
    res.json({ id, name, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE an item
exports.deleteItem = async (req, res) => {
    console.log("Delete Items")
  try {
    const { id } = req.params;
    const result = await dbRun('DELETE FROM items WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
