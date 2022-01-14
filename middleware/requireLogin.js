const jwt = require('jsonwebtoken')
const {JWT_Secret} =require('../config/keys')

const mongoose = require('mongoose')
const User= mongoose.model('User')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers //destructuring
    if(!authorization){
        res.status(401).json({error:"u must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    // console.log(token)
    jwt.verify(token,JWT_Secret,(err,payload)=>{
        if(err){
            res.status(401).json({error:"u must be logged in"})
        }
        const {_id}= payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            // console.log("values: ",payload)
            next()
        })
        
    })
}