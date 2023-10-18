import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getOneUser,
  getUserById,
  signin,
  signout,
  signup,
} from "../controllers/auth.js";

router.get("/user", getOneUser);
router.get("/user/:id", getUserById);
router.get("/users", getAllUsers);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
export default router;
