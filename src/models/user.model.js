import jwt from "jsonwebtoken";
import mongoose ,{Schema}from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    username:{
        type: String,
        required : true,
        unique : true,
        lowecase : true,
        trim : true,
        index : true
    },
    email:{
        type: String,
        required : true,
        unique : true,
        lowecase : true,
        trim : true,
    },
    fullname:{
        type: String,
        required : true,
        lowecase : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,
        required : true,

    },
    coverImage:{
        type : String,   
    },
    watcHistory :[
        {
            types : Schema.Types.ObjectId,
            ref : 'Vedio'
        }
    ],
    password :{
        type : String,
        required : [true,'password is required']
    },
    refreshTocken :{
        type : String ,

    }
},{
    timestamps : true
}
)

// this is encryption of the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = bcrypt.hash(this.password,10)
    next()
})

// this is checking the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}
// generating the access tocken
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
// generating the refresh tocken
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}



export const User = mongoose.model("User",userSchema)