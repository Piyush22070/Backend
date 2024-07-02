import jwt from "jsonwebtoken";
import mongoose ,{Schema}from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
    username:{
        type: String,
        required : true,
        unique : true,
        lowercase : true,
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
        type : String,// cloudianary url
        required : true,
    },
    coverImage:{
        type : String,   
        //required optional
    },
    watcHistory :[
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password :{
        type : String,
        required : [true,'password is required']
    },
    refreshToken :{
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
    this.password = await bcrypt.hash(this.password,10)
    next()
})

// this is checking the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

// generating the access tocken
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// generating the refresh tocken
// userSchema.methods.generateRefreshToken = function(){
//     // jwt sign in function has Three parameters
    
//     return jwt.sign({
//         _id : this._id
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//         expiresIn : process.env.REFRESH_TOKEN_EXPIRY
//     }
// )
// }
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// this User can directly contact with the data base
export const User = mongoose.model("User",userSchema)