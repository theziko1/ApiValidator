import { compare, genSalt, hash } from "bcrypt";
import { User, validateLoginUser, validateRegisterUser, validateUpdateUser } from "../models/User.js";
import jwt from "jsonwebtoken";

export const Register =  async (req, res) => {
    try {
      const { error } = validateRegisterUser(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { username, email, password } = req.body;
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      await User.create({
        username,
        email,
        password: hashPassword,
      });
       return res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "User not registered " + error });
    }
  }
export const Login = async (req, res) => {
    try {
      const { error } = validateLoginUser(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { username, password } = req.body;
  
      // Verify if input is empty
      if (!username || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid information" });
      }
  
      const userLogin = await User.findOne({ username });
  
      if (!userLogin) {
        console.log("User does not exist");
        return res
          .status(404)
          .json({ success: false, message: "User does not exist" });
      }
  
      const match = await compare(password, userLogin.password);
  
      if (!match) {
        return res
          .status(400)
          .json({ success: false, message: "Username or password is incorrect" });
      }
      const token = jwt.sign(
        {
          userId: userLogin.id,
          username: userLogin.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "6h",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({
        success: true,
        message: "login successfully",
        token: token,
        data: userLogin,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: "login failed " + error });
    }
  }
export const getAllUsers =  async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
       return res.status(400).json({ success: false, message: "Failed to fetch users" });
    }
  }
export const getUserbyId = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
       return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: "Failed to fetch user " });
    }
  }
export const UpdateUser = async (req, res) => {
    try {
      const { error } = validateUpdateUser(req.body);
  
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: "Failed to update user" });
    }
  }


 export const DeleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
       return res.status(404).json({ success: false, message: "User not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      return res.status(400).json({ success: false, message: "Failed to delete user" });
    }
  }