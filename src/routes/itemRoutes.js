const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

router.get('/items', itemController.getAllItems);
router.post('/items', auth, itemController.createItem);
router.get('/items/:id', itemController.getItemById);
router.put('/items/:id', auth, itemController.updateItem);
router.delete('/items/:id',  itemController.deleteItem);

module.exports = router;
