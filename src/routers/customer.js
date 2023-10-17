import express from "express";
const router = express.Router();
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../controllers/customer.js";

router.post("/customers", createCustomer);
router.get("/customers", getAllCustomers);
router.delete("/customers/:id", deleteCustomer);

export default router;
