const express = require('express');
const router = express.Router();
const { getAllItems, getItemById, createItem, updateItem, softDeleteItem } = require('../controllers/itemControllers.js');
const auth = require("../middlewares/authenticateToken.js")

router.post('/', auth, createItem);
router.get('/', auth, getAllItems);
router.get('/:id', auth, getItemById);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, softDeleteItem);

module.exports = router;