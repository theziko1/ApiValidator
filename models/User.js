import { Schema, mongoose } from "mongoose";
import Joi from 'joi'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
});


/**
 * @desc function validate Register User
 * @access public
 *
 */
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    username: Joi.string().trim().alphanum().min(3).max(200).required(),
    password: Joi.string().trim().alphanum().min(3).max(200).required(),
    age: Joi.number().trim().min(3).max(200).required(),
  });

  return schema.validate(obj);
}

/**
 * @desc function validate Update User
 * @access public
 */
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100),
    username: Joi.string().trim().alphanum().min(3).max(200),
    password: Joi.string().trim().alphanum().min(3).max(200),
    age: Joi.number().trim().min(3).max(200),
  });

  return schema.validate(obj);
}

/**
 * @desc function validate Login user
 * @access public
 */
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    password: Joi.string().trim().alphanum().min(3).max(200).required(),
  });

  return schema.validate(obj);
}
const User = mongoose.model("User", UserSchema);
export  {
  User,
  validateRegisterUser,
  validateUpdateUser,
  validateLoginUser,
};
