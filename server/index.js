import express from "express";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { postSignup, postLogin } from "./controllers/user.js";
import {
  jwtVerifyMiddleware,
  checkRoleMiddleware,
} from "./middlewares/auth.js";
import { postProducts, getProducts } from "./controllers/product.js";
import {
  getOrderById,
  getOrdersByUserId,
  postOrders,
  putOrders,
} from "./controllers/order.js";
import { postPayments } from "./controllers/Payment.js";
import { responder } from "./utils/utils.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "test secret",
    cookie: { maxAge: 60000 },
  })
);

//connect to mongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  if (conn) {
    console.log(`MongoDB connected successfully`);
  }
};

app.get("/health", jwtVerifyMiddleware, (req, res) => {
  req.session.user = { id: "1", name: "Test" };
  return responder(res, true, "Server is running");
});

// Auth API's
app.post("/signup", postSignup);
app.post("/login", postLogin);

// Product API's
app.post("/products", jwtVerifyMiddleware, checkRoleMiddleware, postProducts);
app.get("/products", getProducts);

// Order API's
app.post("/orders", jwtVerifyMiddleware, postOrders);
app.put("/orders/:id", jwtVerifyMiddleware, putOrders);
app.get("/orders/:id", jwtVerifyMiddleware, getOrderById);
app.get("/orders/user/:id", jwtVerifyMiddleware, getOrdersByUserId);

// Payment API's
app.post("/payments", postPayments);

app.use("*", (req, res) => {
  return responder(res, false, "API endpoint doesn't exist", null, 404);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
