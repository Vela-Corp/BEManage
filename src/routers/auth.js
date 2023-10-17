import express from "express";
const router = express.Router();
import { getOneUser, signin, signup } from "../controllers/auth.js";

router.get("/user", getOneUser);
router.post("/signup", signup);
router.post("/signin", signin);
export default router;
