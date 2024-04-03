import { User, validateUpdateUser } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to fetch users" });
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to fetch user " });
  }
};

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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to update user" });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to delete user" });
  }
};
