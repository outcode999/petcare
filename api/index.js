import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import Formdata from "./routes/Form.route.js";
import Payment from "./routes/payment.route.js";
import Item from "./routes/Item.route.js";
import Reason from "./routes/Reason.route.js";
import Heal from "./routes/health.route.js";






import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("is work");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", UserRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/from", Formdata);
app.use("/api/payment", Payment);
app.use("/api/item", Item);
app.use("/api/reason", Reason);
app.use("/api/health", Heal)





app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
