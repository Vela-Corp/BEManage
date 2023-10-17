import express from "express";
const router = express.Router();
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
} from "../controllers/event.js";
router.get("/events", getAllEvents);
router.get("/event/:id", getEvent);
router.post("/event", createEvent);
router.put("/event:id", updateEvent);
router.delete("/event/:id", deleteEvent);
export default router;
