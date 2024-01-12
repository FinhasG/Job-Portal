const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user_model");
const {errorHandler}=require('../utils/error');
const  nodemailer = require('nodemailer');

const Signup = async (req, res, next) => {
  const { firstname,lastname, email, password } = req.body;
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

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
        firstname:firstname,
        lastname: lastname,
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      try {
        await user.save();
        res.status(200).json("successfully registered");
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

const Signin= async(req, res, next)=>{
  const {email,password}=req.body;
  try {
    const user=await userSchema.findOne({email});
    if(!user) return next(errorHandler(404,"User not found"));
    const isMatch= await bcrypt.compare(password, user.password);
    if(!isMatch) return next(errorHandler(404,"Wrong credentials"))
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    const {password:pass, ...info}=user._doc;
    res.cookie("token",token,{httpOnly:true}).status(200).json(info);
  } catch (error) {
    next(error);
  }
}

const ForgotPassword= async(req,res,next)=>{
  const {email}=req.body;
  const user=await userSchema.findOne({email})
  if(!user) return next(errorHandler(404,"User not found"));
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
  const {password:pass, ...info}=user._doc;
  res.cookie("token",token,{httpOnly:true}).status(200).json(info);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arrowrq2nml13218835finhas@gmail.com',
    pass: "ueaa mqqr wanm rjhg"
  }
});

var mailOptions = {
  from: 'arrowrq2nml13218835finhas@gmail.com',
  to: email,
  subject: 'Reset password link',
  text: `http://localhost:5173/reset-password/${user._id}/${token}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    next(error)
  } else {
    res.status(200).json('Email sent: ' + info.response);
  }
});
}

const ResetPassword = async(req,res,next)=>{
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
          return res.json( "Error with token")
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              userSchema.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.json(success))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
}

module.exports={Signup,Signin,ForgotPassword,ResetPassword};
