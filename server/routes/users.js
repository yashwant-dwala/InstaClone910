const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

const requireLogin = require("../middleware/requireLogin");

router.get("/user/:userId", requireLogin,  (req, res) => {
  User.findOne({ _id: req.params.userId }).select("-password").then(user => {
        Post.find({ postedBy: req.params.userId }).populate("postedBy", "_id name").exec((err, posts) => {
            if (err) return res.status(422).json({ error: err })
            else res.json({ user, posts })
            console.log(user,posts)
        })
    }).catch (error=>{
        console.log(error)
    }) 
})

router.put("/follow", requireLogin, async (req, res) => {
    try {
        const xUser = User.findByIdAndUpdate(req.body.followId ,{
                $pull: { followers: req.user.id }
            }
            , { new: true })
        console.log(xUser)
        const updatedUser = await User.findByIdAndUpdate(req.body.followId,
            {
                $push: { followers: req.user.id }
            }
            , { new: true })
        if (updatedUser.error) {
            return res.status(422).json({ error :updatedUser.error})
        }
        // console.log("followers: ",updatedUser)
        User.findByIdAndUpdate(req.user.id,
            {
            $push:{following:req.body.followId}
            }, { new: true }).select("-password").then(result => {
                // console.log("following: ",result)
                res.json({updatedUser })
            }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
})

router.put("/unfollow", requireLogin, async (req, res) => {
    try {        
        const updatedUser = await User.findByIdAndUpdate(req.body.followId,
            {
                $pull: { followers: req.user.id }
            }
            , { new: true })
        if (updatedUser.error) {
            return res.status(422).json({ error :updatedUser.error})
        }
        // console.log("followers: ",updatedUser)
        User.findByIdAndUpdate(req.user.id,
            {
            $pull:{following:req.body.followId}
            }, { new: true }).select("-password").then(result => {
                // console.log("following: ",result)
                res.json({updatedUser })
            }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
})

router.put("/updatepic", requireLogin, async (req, res) => {
    try {
        const updatepic = await User.findByIdAndUpdate(req.user.id, {
            $set: {pic:req.body.pic}
        }, { new: true })
        console.log(updatepic)
        res.json(updatepic)
    }
    catch (error){
        console.log(error)
    } 
})


module.exports = router;