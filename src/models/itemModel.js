const pool = require('../config/db');

exports.createItem = async (name, description) => {
  const [result] = await pool.query(
    'INSERT INTO items (name, description, created_at) VALUES (?, ?, NOW())',
    [name, description]
  );
  return { id: result.insertId, name, description, created_at: new Date() };
};

exports.getAllItems = async () => {
  const [rows] = await pool.query('SELECT * FROM items');
  return rows;
};

exports.getItemById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
  return rows[0] || null;
};

exports.updateItem = async (id, name, description) => {
  await pool.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
  return { id, name, description };
};

exports.deleteItem = async (id) => {
  await pool.query('DELETE FROM items WHERE id = ?', [id]);
  return { message: 'Item deleted successfully' };
};
