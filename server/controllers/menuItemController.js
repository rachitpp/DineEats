const MenuItem = require('../models/menuItem');

// @desc    Get all menu items
// @route   GET /api/menu-items
// @access  Public
const getMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const menuItems = await MenuItem.find(filter);
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu-items/:id
// @access  Public
const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(200).json(menuItem);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid menu item ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new menu item
// @route   POST /api/menu-items
// @access  Private/Admin
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      image: image || 'default-food.jpg'
    });
    
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu-items/:id
// @access  Private/Admin
const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable } = req.body;
    
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price !== undefined ? price : menuItem.price;
    menuItem.category = category || menuItem.category;
    menuItem.image = image || menuItem.image;
    menuItem.isAvailable = isAvailable !== undefined ? isAvailable : menuItem.isAvailable;
    
    const updatedMenuItem = await menuItem.save();
    
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid menu item ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu-items/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    await menuItem.deleteOne();
    
    res.status(200).json({ message: 'Menu item removed' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid menu item ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
