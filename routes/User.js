
import { Router } from "express";

import { DeleteUser, UpdateUser, getAllUsers, getUserbyId } from "../controllers/userController.js";
import { Login, Register } from "../controllers/authController.js";


const router = Router(); 

// Register
router.post("/register",Register);

// login
router.post("/login", Login );

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserbyId );

// Update user by ID
router.put("/:id",UpdateUser);

// Delete user by ID
router.delete("/:id",DeleteUser);

export default router;
