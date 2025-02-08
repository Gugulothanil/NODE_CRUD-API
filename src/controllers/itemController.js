const itemModel = require('../models/itemModel');

exports.createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const item = await itemModel.createItem(name, description);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await itemModel.getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedItem = await itemModel.updateItem(req.params.id, name, description);
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await itemModel.deleteItem(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};
   