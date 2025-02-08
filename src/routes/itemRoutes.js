const express = require('express');
const router = express.Router();
//const itemController = require('../controllers/itemController');
const itemController = require('../controllers/itemController'); // ✅ Correct import


console.log("✅ itemRoutes.js is loaded!");

router.get('/items', itemController.getAllItems); // ✅ Ensure function exists
router.post('/items', itemController.createItem);
router.get('/items/:id', itemController.getItemById);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router; // ✅ Ensure this is present
