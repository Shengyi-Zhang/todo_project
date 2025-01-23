const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userSchema");
const Task = require("./models/taskSchema");
const connectDB = require("./config/db");

connectDB();
const seedDB = async () => {
  try {
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log("Cleaned data");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("lz2002111", salt);
    const users = await User.insertMany([
      {
        userName: "zsy",
        password: hashedPassword,
        userInfo: {
          email: "xxx@gmail.com",
          firstName: "Shen",
          lastName: "Zhang",
        },
      },
    ]);

    const todos = await Task.insertMany([
      {
        userId: users[0]._id,
        title: "First todo",
        desc: "I dont know what to do",
        completed: false,
      },
      {
        userId: users[0]._id,
        title: "Second todo",
        desc: "I dont know what to doI dont know what to doI dont know what to doI dont know what to do",
        completed: false,
      },
    ]);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding the database: ", err);
    mongoose.connection.close();
  }
};

seedDB();
