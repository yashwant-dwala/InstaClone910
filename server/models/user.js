//  Blueprint of DATA Entries

const mongoose =require('mongoose')
const { Schema } = mongoose;
const { ObjectID } = Schema.Types;

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    pic:{
        type: String,
        default:"https://res.cloudinary.com/xenotoxin/image/upload/v1638857724/default-profile-pic-e1513291410505_saksl6.jpg"
    },
    followers: [{
        type: ObjectID,
        ref:"User"
    }],
    following: [{
        type: ObjectID,
        ref:"User"
    }],
})

mongoose.model("User",userSchema)