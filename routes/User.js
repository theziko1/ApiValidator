import { compare, genSalt, hash } from "bcrypt";
import { User } from "../models/User.js";
import { Router } from "express";
import jwt from "jsonwebtoken"

const router = Router();

// Register
router.post("/register", async (req, res) =>
{
    try {
        
          const { username , email , password} = req.body
          const salt = await genSalt(10)
          const hashPassword = await hash(password,salt)
          await User.create({
             username, email , password: hashPassword
          })
          res.status(201).json({success : true, message : "User registered successfully"})
      } catch (error) {
          res.status(500).json({success : false, error : "User not registered "+error})
      }
});

// login 
router.post("/login", async (req, res) =>
{
    const { username, password } = req.body;
         try {
           // Verify if input is empty
           if (!username || !password) {
             return res.status(400).json({success : false , message: 'Invalid information' });
           }
       
           const userLogin = await User.findOne({ username });
       
           if (!userLogin) {
             console.log('User does not exist');
             return res.status(404).json({success : false , message : 'User does not exist'});
           }
       
           
           const match = await compare(password, userLogin.password );
       
           
           if (!match) {
             return res.status(400).json({success : false , message : 'Username or password is incorrect'});
           }
          const token = jwt.sign( {
            userId: userLogin.id,
            username: userLogin.username, 
        }, process.env.SECRET_KEY, {
             expiresIn: '6h',
             });
          res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
          })   
          res.status(200).json({ success : true, message : "login successfully", token : token, data : userLogin}) 
       } catch (error) {
        res.status(500).json({success : false ,error : "login failed "+error})
       }
});



// Get all users
router.get("/", async (req, res) =>
{
    try
    {
        const users = await User.find();
        res.status(200).json({ success : true , message : 'Users fetched successfully', data : users});
    } catch (error)
    {
        res.status(400).json({ success : false , message : 'Failed to fetch users'});
    }
});

// Get user by ID
router.get("/:id" , async (req, res) =>
{
    try
    {
        const user = await User.findById(req.params.id);
        if (!user)
        {
            res.status(404).json({ success : false , message : 'User not found'});
        }
        res.status(200).json({ success : true , message : 'User fetched successfully', data : user});
    } catch (error)
    {
        res.status(400).json({ success : false , message : 'Failed to fetch user '});
    }
});

// Update user by ID
router.put("/:id" , async (req, res) =>
{
    try
    {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user)
        {
            res.status(404).json({ success : false , message : 'User not found'});
        }
        res.status(200).json({ success : true , message : 'User updated successfully' , data : user});
        
    } catch (error)
    {
        res.status(400).json({ success : false , message : 'Failed to update user'});
    }
});

// Delete user by ID
router.delete("/:id" , async (req, res) =>
{
    try
    {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)
        {
            res.status(404).json({ success : false , message : 'User not found'});
        }
        res.status(200).json({ success : true , message : 'User deleted successfully' });
    } catch (error)
    {
        res.status(400).json({ success : false , message : 'Failed to delete user'});
    }
});

export default router;