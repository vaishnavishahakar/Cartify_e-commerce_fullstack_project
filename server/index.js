import express from "express";
import cors from "cors";
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
import { postPayments } from "./controllers/payment.js";
import { responder } from "./utils/utils.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
// CORS Setup
app.use(
  cors({
    origin: [
      "https://rtc-e-commerce-project.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors()); // handle preflight requests
app.use(cookieParser());

// Session Setup (still using MemoryStore)
app.use(
  session({
    secret: "test secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: false,
      secure: false,
    },
  })
);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    process.exit(1);
  }
};

// Routes
app.get("/health", jwtVerifyMiddleware, (req, res) => {
  return responder(res, true, "Server is running");
});

app.post("/signup", postSignup);
app.post("/login", postLogin);

app.post("/products", jwtVerifyMiddleware, checkRoleMiddleware, postProducts);
app.get("/products", getProducts);

app.post("/orders", jwtVerifyMiddleware, postOrders);
app.put("/orders/:id", jwtVerifyMiddleware, putOrders);
app.get("/orders/:id", jwtVerifyMiddleware, getOrderById);
app.get("/orders/user/:id", jwtVerifyMiddleware, getOrdersByUserId);

app.post("/payments", postPayments);

app.use("*", (req, res) => {
  return responder(res, false, "API endpoint doesn't exist", null, 404);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {});
};

startServer();
