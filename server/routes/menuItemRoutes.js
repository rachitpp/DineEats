const express = require('express');
const router = express.Router();
const { 
  getMenuItems, 
  getMenuItemById, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} = require('../controllers/menuItemController');

// Routes for menu items
router.route('/')
  .get(getMenuItems)
  .post(createMenuItem);

router.route('/:id')
  .get(getMenuItemById)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

module.exports = router;
