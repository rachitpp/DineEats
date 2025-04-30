require("dotenv").config();
const mongoose = require("mongoose");
const { connectMongoDB } = require("./db");
const MenuItem = require("../models/menuItem");

// Sample menu items data
const menuItems = [
  // Appetizers
  {
    name: "Paneer Tikka",
    description:
      "Chunks of paneer marinated in spices and grilled in a tandoor for a smoky flavor.",
    price: 250,
    category: "Appetizers",
    image: "/static/images/paneertikka.jpg",
  },
  {
    name: "Chicken Tikka Masala",
    description:
      "Tender chicken pieces marinated in cream, cheese, and mild spices, cooked until juicy and golden.",
    price: 280,
    category: "Appetizers",
    image: "/static/images/chickentikka.jpg",
  },
  {
    name: "Samosa",
    description:
      "Crisp golden pastry filled with spicy mashed potatoes and green peas.",
    price: 60,
    category: "Appetizers",
    image: "/static/images/samosa.jpg",
  },

  // Main Course
  {
    name: "Butter Chicken",
    description:
      "Juicy chicken cooked in a rich and creamy tomato gravy with a hint of butter and spices.",
    price: 360,
    category: "Main Course",
    image: "/static/images/butterchicken.jpg",
  },
  {
    name: "Paneer Butter Masala",
    description:
      "Soft paneer cubes simmered in a buttery tomato-cashew gravy, flavored with Indian spices.",
    price: 320,
    category: "Main Course",
    image: "/static/images/paneerbuttermasala.jpg",
  },
  {
    name: "Mutton Rogan Josh",
    description:
      "Aromatic Kashmiri lamb curry slow-cooked with yogurt and a blend of traditional spices",
    price: 400,
    category: "Main Course",
    image: "/static/images/roganjosh.jpg",
  },
  {
    name: "Vegetable Biryani",
    description:
      " Fragrant basmati rice layered with spiced vegetables, saffron, and herbs.",
    price: 290,
    category: "Main Course",
    image: "/static/images/vegbiryani.jpg",
  },

  // Desserts
  {
    name: "Gulab Jamun",
    description:
      "Deep-fried milk dumplings soaked in cardamom-flavored sugar syrup",
    price: 120,
    category: "Desserts",
    image: "/static/images/gulab.jpg",
  },
  {
    name: "Rasmalai",
    description:
      " Soft cottage cheese balls immersed in chilled saffron and cardamom-flavored sweet milk.",
    price: 150,
    category: "Desserts",
    image: "/static/images/rasmalai.jpg",
  },

  // Drinks
  {
    name: "Masala Chai ",
    description:
      "Classic Indian tea brewed with milk, ginger, and aromatic spices.",
    price: 40,
    category: "Drinks",
    image: "/static/images/chai.jpg",
  },
  {
    name: "Mango Lassi",
    description:
      "Refreshing yogurt-based drink blended with sweet ripe mangoes.",
    price: 90,
    category: "Drinks",
    image: "/static/images/lassi.jpg",
  },
  {
    name: "Sweet Lime Soda",
    description:
      "Fizzy soda mixed with lemon juice and sugar for a zesty, refreshing treat.",
    price: 70,
    category: "Drinks",
    image: "/static/images/soda.jpg",
  },
];

// Function to seed database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Delete existing data
    await MenuItem.deleteMany({});
    console.log("Deleted existing menu items");

    // Insert new data
    const createdItems = await MenuItem.insertMany(menuItems);
    console.log(`Inserted ${createdItems.length} menu items`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase();
