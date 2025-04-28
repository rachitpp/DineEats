require('dotenv').config();
const mongoose = require('mongoose');
const { connectMongoDB } = require('./db');
const MenuItem = require('../models/menuItem');

// Sample menu items data
const menuItems = [
  // Appetizers
  {
    name: 'Garlic Bread',
    description: 'Toasted bread with garlic butter and herbs',
    price: 4.99,
    category: 'Appetizers',
    image: 'default-food.jpg'
  },
  {
    name: 'Mozzarella Sticks',
    description: 'Breaded mozzarella sticks served with marinara sauce',
    price: 7.99,
    category: 'Appetizers',
    image: 'default-food.jpg'
  },
  {
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings served with blue cheese dip',
    price: 9.99,
    category: 'Appetizers',
    image: 'default-food.jpg'
  },
  
  // Main Course
  {
    name: 'Classic Burger',
    description: 'Beef patty with lettuce, tomato, cheese, and special sauce',
    price: 12.99,
    category: 'Main Course',
    image: 'default-food.jpg'
  },
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 14.99,
    category: 'Main Course',
    image: 'default-food.jpg'
  },
  {
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with herbs and lemon, served with vegetables',
    price: 18.99,
    category: 'Main Course',
    image: 'default-food.jpg'
  },
  {
    name: 'Chicken Alfredo Pasta',
    description: 'Fettuccine pasta with creamy alfredo sauce and grilled chicken',
    price: 15.99,
    category: 'Main Course',
    image: 'default-food.jpg'
  },
  
  // Desserts
  {
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie served with vanilla ice cream',
    price: 6.99,
    category: 'Desserts',
    image: 'default-food.jpg'
  },
  {
    name: 'Cheesecake',
    description: 'Classic New York style cheesecake with berry compote',
    price: 7.99,
    category: 'Desserts',
    image: 'default-food.jpg'
  },
  
  // Drinks
  {
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with fresh lemons and mint',
    price: 3.99,
    category: 'Drinks',
    image: 'default-food.jpg'
  },
  {
    name: 'Iced Coffee',
    description: 'Cold brewed coffee served over ice with cream',
    price: 4.99,
    category: 'Drinks',
    image: 'default-food.jpg'
  },
  {
    name: 'Mango Smoothie',
    description: 'Fresh mango blended with yogurt and honey',
    price: 5.99,
    category: 'Drinks',
    image: 'default-food.jpg'
  }
];

// Function to seed database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    
    // Delete existing data
    await MenuItem.deleteMany({});
    console.log('Deleted existing menu items');
    
    // Insert new data
    const createdItems = await MenuItem.insertMany(menuItems);
    console.log(`Inserted ${createdItems.length} menu items`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase();
