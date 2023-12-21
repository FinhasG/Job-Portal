const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        avatar: {
            type:String,
            default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
        },
        { timestamps: true }
)

module.exports=mongoose.model("User",userSchema)