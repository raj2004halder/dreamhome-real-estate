import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Get profile
router.get("/profile", protect, getProfile);


// Update profile
router.put("/profile", protect, updateProfile);


// Logout
router.post("/logout", logoutUser);


export default router;