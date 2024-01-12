const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user_model");
const { errorHandler } = require("../utils/error");

const LoginWithGoogle = async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...info } = user._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(info);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new userSchema({
        firstname:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...info } = newUser._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(info);
    }
  } catch (error) {
    next(error);
  }
};

const LoginWithFacebook = async (req, res, next) => {
  try {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
      const hashedPassword=bcrypt.hashSync(generatedPassword, 10);
      const newUser=new userSchema({
        firstname:req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
        password:hashedPassword,
        avatar:req.body.photo
      });
      await newUser.save();
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const { password:pass, ...info}=newUser._doc;
      res.cookie("token",token, {httpOnly:true}).status(200).json(info); 
  } catch ({ error }) {
    next(error);
  }
};

module.exports = { LoginWithGoogle, LoginWithFacebook };
