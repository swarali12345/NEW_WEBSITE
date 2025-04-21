const dotenv = require('dotenv');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const Product = require('../models/product');
const User = require('../models/User');
const Order = require('../models/order');
const Sale = require('../models/Sale');
const products = require('../data/products');
// const users = require('../data/users'); // Removed users import
const sales = require('../data/sales');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Create default users directly in the script
const defaultUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Sale.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(defaultUsers);
    const adminUser = createdUsers[0]._id;

    // Add admin user as creator of all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert products
    const createdProducts = await Product.insertMany(sampleProducts);
    
    // Add admin user and product references to sales data
    const sampleSales = sales.map((sale, index) => {
      // Use modulo to cycle through the products when more sales than products
      const productIndex = index % createdProducts.length;
      return { 
        ...sale, 
        user: adminUser, 
        product: createdProducts[productIndex]._id,
      };
    });
    
    // Insert sales
    await Sale.insertMany(sampleSales);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Sale.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line args to determine action
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 