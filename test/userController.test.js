import {
    getAllUsers,
    getUserbyId,
    UpdateUser,
    DeleteUser
  } from "../controllers/userController";
  import { User, validateUpdateUser } from "../models/User.js";
  
  jest.mock("../models/User");
  
  describe("userController", () => {
    describe("getAllUsers", () => {
      it("should fetch all users successfully", async () => {
        const users = [{ username: "user1" }, { username: "user2" }];
        User.find.mockResolvedValue(users);
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        await getAllUsers(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: "Users fetched successfully",
          data: users
        });
      });
  
      it("should handle error when fetching users", async () => {
        User.find.mockRejectedValue(new Error("Failed to fetch users"));
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        await getAllUsers(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "Failed to fetch users"
        });
      });
    });
  
    describe("getUserbyId", () => {
      it("should fetch user by id successfully", async () => {
        const user = { _id: "fakeId", username: "testuser" };
        User.findById.mockResolvedValue(user);
        const req = { params: { id: "fakeId" } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        await getUserbyId(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: "User fetched successfully",
          data: user
        });
      });
  
      it("should handle error when fetching user by id", async () => {
        User.findById.mockRejectedValue(new Error("Failed to fetch user"));
        const req = { params: { id: "fakeId" } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        await getUserbyId(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "Failed to fetch user"
        });
      });
  
      it("should handle user not found", async () => {
        User.findById.mockResolvedValue(null);
        const req = { params: { id: "fakeId" } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
  
        await getUserbyId(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: "User not found"
        });
      });
    });
  
    describe("UpdateUser", () => {
        it("should update user successfully", async () => {
          const updatedUser = { _id: "fakeId", username: "updatedUser" };
          User.findByIdAndUpdate.mockResolvedValue(updatedUser);
          const req = { params: { id: "fakeId" }, body: { username: "updatedUser" } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
    
          await UpdateUser(req, res);
    
          expect(User.findByIdAndUpdate).toHaveBeenCalledWith("fakeId", { username: "updatedUser" }, { new: true, runValidators: true });
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "User updated successfully",
            data: updatedUser
          });
        });
    
        it("should handle error when updating user", async () => {
          User.findByIdAndUpdate.mockRejectedValue(new Error("Failed to update user"));
          const req = { params: { id: "fakeId" }, body: { username: "updatedUser" } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
    
          await UpdateUser(req, res);
    
          expect(User.findByIdAndUpdate).toHaveBeenCalledWith("fakeId", { username: "updatedUser" }, { new: true, runValidators: true });
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Failed to update user"
          });
        });
    
        it("should handle user not found", async () => {
          User.findByIdAndUpdate.mockResolvedValue(null);
          const req = { params: { id: "fakeId" }, body: { username: "updatedUser" } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
    
          await UpdateUser(req, res);
    
          expect(User.findByIdAndUpdate).toHaveBeenCalledWith("fakeId", { username: "updatedUser" }, { new: true, runValidators: true });
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "User not found"
          });
        });
      });
    
      describe("DeleteUser", () => {
        it("should delete user successfully", async () => {
          const deletedUser = { _id: "fakeId", username: "deletedUser" };
          User.findByIdAndDelete.mockResolvedValue(deletedUser);
          const req = { params: { id: "fakeId" } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
    
          await DeleteUser(req, res);
    
          expect(User.findByIdAndDelete).toHaveBeenCalledWith("fakeId");
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "User deleted successfully"
          });
        });
    
        it("should handle error when deleting user", async () => {
          User.findByIdAndDelete.mockRejectedValue(new Error("Failed to delete user"));
          const req = { params: { id: "fakeId" } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
    
          await DeleteUser(req, res);
    
          expect(User.findByIdAndDelete).toHaveBeenCalledWith("fakeId");
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Failed to delete user"
          });
        });
    
        it("should handle user not found", async () => {
          User.findByIdAndDelete.mockResolvedValue(null);
          const req = { params: { id: "fakeId" } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
    
          await DeleteUser(req, res);
    
          expect(User.findByIdAndDelete).toHaveBeenCalledWith("fakeId");
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "User not found"
          });
        });
      });
    
  });
  