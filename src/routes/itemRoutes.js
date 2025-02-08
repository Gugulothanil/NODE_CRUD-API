const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

console.log("✅ itemRoutes.js is loaded!");

router.get('/items', (req, res) => {
    console.log("✅ GET /api/items called");
    itemController.getAllItems(req, res);
});

router.post('/items', itemController.createItem);
router.get('/items/:id', itemController.getItemById);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
