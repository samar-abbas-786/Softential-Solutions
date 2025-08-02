const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/customer_management');
    console.log('MongoDB connected for seeding...');

    await User.deleteMany({});
    console.log('Existing users cleared');

    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();