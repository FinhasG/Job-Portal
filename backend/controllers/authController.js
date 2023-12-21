const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user_model");
const {errorHandler}=require('../utils/error')

const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    password: Joi.string(),
  });
 
  try {
    const validateResults = schema.validate(req.body);
    if (validateResults.error) {
      //res.send(validateResults.error).status(404)
      res.status(400).json(validateResults.error );
    } else {
      const user = new userSchema({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      try {
        await user.save();
        res.status(200).json("successfully registered");
      } catch (error) {
        next(error);
      }
      //redirect('/login')
    }
  } catch (error) {
    next(error);
  }
};

const Signin= async(req, res, next)=>{
  const {email,password}=req.body;
  try {
    const user=await userSchema.findOne({email});
    if(!user) return next(errorHandler(404,"User not found"))
    const isMatch= await bcrypt.compare(password, user.password);
    if(!isMatch) return next(errorHandler(404,"Wrong credentials"))
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    const {password:pass, ...info}=user._doc;
    res.cookie("token",token,{httpOnly:true}).status(200).json(info)
  } catch (error) {
    next(error)
  }
}

module.exports={Signup,Signin}
