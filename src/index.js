import express, { Router } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import RouterEvent from "./routers/event.js";
import RouterCustomer from "./routers/customer.js";
import RouterAuth from "./routers/auth.js";
import RouterCheck from "./routers/checkin.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api", RouterEvent);
app.use("/api", RouterCustomer);
app.use("/api", RouterCheck);
app.use("/api", RouterAuth);

mongoose
  .connect(process.env.API_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
