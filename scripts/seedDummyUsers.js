// scripts/seedUsersWithPasswords.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // await User.deleteMany({});
    // console.log("All existing users deleted.");

    // Dummy data
    const users = [
      {
        username: "alice",
        email: "alice@example.com",
        password: "password123",
        age_group: "18-25",
        level: "Bronze",
        avatar_url: "https://example.com/avatar1.jpg",
      },
      {
        username: "bob",
        email: "bob@example.com",
        password: "securepass",
        age_group: "26-35",
        level: "Silver",
        avatar_url: "https://example.com/avatar2.jpg",
      },
      {
        username: "charlie",
        email: "charlie@example.com",
        password: "mypassword",
        age_group: "36-45",
        level: "Gold",
        avatar_url: "https://example.com/avatar3.jpg",
      },
      {
        username: "david",
        email: "david@example.com",
        password: "davpass",
        age_group: "18-25",
        level: "Bronze",
        avatar_url: "https://example.com/avatar4.jpg",
      },
      {
        username: "emma",
        email: "emma@example.com",
        password: "emma123",
        age_group: "26-35",
        level: "Silver",
        avatar_url: "https://example.com/avatar5.jpg",
      },
      {
        username: "frank",
        email: "frank@example.com",
        password: "frankpass",
        age_group: "46-55",
        level: "Gold",
        avatar_url: "https://example.com/avatar6.jpg",
      },
      {
        username: "grace",
        email: "grace@example.com",
        password: "gracepw",
        age_group: "36-45",
        level: "Bronze",
        avatar_url: "https://example.com/avatar7.jpg",
      },
      {
        username: "henry",
        email: "henry@example.com",
        password: "henry456",
        age_group: "26-35",
        level: "Silver",
        avatar_url: "https://example.com/avatar8.jpg",
      },
      {
        username: "ivy",
        email: "ivy@example.com",
        password: "ivypass",
        age_group: "18-25",
        level: "Gold",
        avatar_url: "https://example.com/avatar9.jpg",
      },
      {
        username: "jack",
        email: "jack@example.com",
        password: "jackie123",
        age_group: "36-45",
        level: "Bronze",
        avatar_url: "https://example.com/avatar10.jpg",
      },
      {
        username: "kate",
        email: "kate@example.com",
        password: "katepass",
        age_group: "26-35",
        level: "Silver",
        avatar_url: "https://example.com/avatar11.jpg",
      },
      {
        username: "leo",
        email: "leo@example.com",
        password: "leopass",
        age_group: "46-55",
        level: "Gold",
        avatar_url: "https://example.com/avatar12.jpg",
      },
      {
        username: "mia",
        email: "mia@example.com",
        password: "mia321",
        age_group: "18-25",
        level: "Bronze",
        avatar_url: "https://example.com/avatar13.jpg",
      },
      {
        username: "nathan",
        email: "nathan@example.com",
        password: "natepass",
        age_group: "36-45",
        level: "Silver",
        avatar_url: "https://example.com/avatar14.jpg",
      },
      {
        username: "olivia",
        email: "olivia@example.com",
        password: "oliviapw",
        age_group: "26-35",
        level: "Gold",
        avatar_url: "https://example.com/avatar15.jpg",
      },
      {
        username: "peter",
        email: "peter@example.com",
        password: "peterpw",
        age_group: "26-35",
        level: "Bronze",
        avatar_url: "https://example.com/avatar16.jpg",
      },
      {
        username: "quinn",
        email: "quinn@example.com",
        password: "quinnpass",
        age_group: "18-25",
        level: "Silver",
        avatar_url: "https://example.com/avatar17.jpg",
      },
      {
        username: "rachel",
        email: "rachel@example.com",
        password: "rachelpw",
        age_group: "36-45",
        level: "Gold",
        avatar_url: "https://example.com/avatar18.jpg",
      },
      {
        username: "steve",
        email: "steve@example.com",
        password: "stevepass",
        age_group: "46-55",
        level: "Bronze",
        avatar_url: "https://example.com/avatar19.jpg",
      },
      {
        username: "tina",
        email: "tina@example.com",
        password: "tinapw",
        age_group: "26-35",
        level: "Silver",
        avatar_url: "https://example.com/avatar20.jpg",
      },
    ];

    // 3. Hash password and insert
    for (let user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    await User.insertMany(users);
    console.log(`${users.length} users added successfully.`);
  } catch (err) {
    console.error("Error seeding users:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
