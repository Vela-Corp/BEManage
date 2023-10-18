import express from "express";
import {
  createCheckin,
  deleteCheckin,
  getAllCheckins,
} from "../controllers/checkin.js";
const router = express.Router();
router.post("/checkin", createCheckin);
router.get("/checkin", getAllCheckins);
router.delete("/checkin/:id", deleteCheckin);
export default router;
