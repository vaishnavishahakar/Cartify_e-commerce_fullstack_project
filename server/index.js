import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cors());

//connect to mongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  if (conn) {
    console.log(`MongoDB connected successfully`);
  }
};

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, phone, address, password, rePassword } = req.body;

  if (password !== rePassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords does not match" });
  }

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  if (!phone) {
    return res
      .status(400)
      .json({ success: false, message: "Phone is required" });
  }

  if (!address) {
    return res
      .status(400)
      .json({ success: false, message: "Address is required" });
  }

  try{
    const newUser = new User({
        name,
        email,
        phone, 
        address,
        password,
    });

    const savedUser = await newUser.save();

    return res.json({
        success: true,
        message: "Signup successful",
        data: savedUser,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: true,
    message: "API endpoint doesn't exist",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
