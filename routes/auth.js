const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../config/keys");

// const requireLogin = require("../middleware/requireLogin");

// SignUp with an Account
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please fill all the fields!" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.startus(422).json({ error: "email already Taken!" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          name,
          password: hashedpassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "user logged Successfully!" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Sign in authentication
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    return res.status(422).json({ error: "please fill all the fields!" });
  }
  User.findOne({ email: email }).populate("followers following", "_id")
    .then((savedUser) => {
      if (!savedUser) {
        res.status(422).json({ error: "invalid Entries !" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            // res.json({message:"Success!"})
            // JWT(json web token) Auth (after signin)
            const token = jwt.sign({ id: savedUser._id }, JWT_Secret);
            const { _id, name, email,followers,following,pic} = savedUser;
            res.json({ token, user:{ _id, name, email,followers,following,pic} });
          } else {
            res.status(422).json({ error: "invalid Entries 2!" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      })
      .catch((err) => {
        console.log("err");
        res.status(500).json(err);
    });
});
module.exports = router;
