import express from "express";
import { createCheckin } from "../controllers/checkin.js";
const router = express.Router();
router.post("/checkin", createCheckin);

export default router;
