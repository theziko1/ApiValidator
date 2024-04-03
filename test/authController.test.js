import { Register, Login } from "../controllers/authController";
import { genSalt, hash, compare } from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

jest.mock("../models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "fakeToken"),
}));

describe("authController", () => {
  describe("Register", () => {
    it("should register a new user", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      genSalt.mockResolvedValue("fakeSalt");
      hash.mockResolvedValue("fakeHash");
      User.create.mockResolvedValue();

      await Register(req, res);

      expect(genSalt).toHaveBeenCalledWith(10);
      expect(hash).toHaveBeenCalledWith("password", "fakeSalt");
      expect(User.create).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        password: "fakeHash",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User registered successfully",
      });
    });
  });

  describe("Login", () => {
    it("should login an existing user", async () => {
      const req = {
        body: {
          username: "testuser",
          password: "password",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      };

      compare.mockResolvedValue(true);
      User.findOne.mockResolvedValue({
        id: "fakeUserId",
        username: "testuser",
        password: "fakeHash",
      });

      await Login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(compare).toHaveBeenCalledWith("password", "fakeHash");
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: "fakeUserId", username: "testuser" },
        process.env.SECRET_KEY,
        { expiresIn: "6h" }
      );
      expect(res.cookie).toHaveBeenCalledWith("token", "fakeToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "login successfully",
        token: "fakeToken",
        data: {
          id: "fakeUserId",
          username: "testuser",
          password: "fakeHash",
        },
      });
    });
  });
});
