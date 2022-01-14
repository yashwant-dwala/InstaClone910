const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Post = mongoose.model("Post");


const requireLogin = require("../middleware/requireLogin");

router.get("/allpost", requireLogin, async (req, res) => {
  try {
    const post = await  Post.find()
      .populate("postedBy", "_id name pic") // details bhar do saari(Key,Selected values)
    .populate("comments.postedBy","name _id pic")
      res.json({post});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/getfollowingspost", requireLogin, async (req, res) => {
  try {
    // PYTHON  ----  if postedBy in following:
    const post = await  Post.find({postedBy:{$in:req.user.following}})
      .populate("postedBy", "_id name pic") // details bhar do saari(Key,Selected values)
    .populate("comments.postedBy","name _id pic")
      res.json({post});
  } catch (error) {
    res.status(500).json(error.message);
  }
});


router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  // console.log("title: ", title, "\n body: ", body, "\n url: ", pic);
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please add all the fields!" });
  }
  // console.log("user: ", req.user);
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post.save().then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.user.id } },
      { new: true }
    ).populate("postedBy", "_id name")
      res.json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/unlike", requireLogin, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.user.id } },
      { new: true }
    ).populate("postedBy", "_id name")
    res.json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


router.put("/comment", requireLogin, async (req, res) => {
  try {
    const comment = {
      text:req.body.text,
      postedBy:req.user.id
    }
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments:comment } },
      { new: true }
    ).populate("postedBy" , "_id name").populate("comments.postedBy" , "_id name")
      console.log("Backend: ",post)
      res.json(post);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

router.delete("/deletepost/:postId", requireLogin,async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId })
     if (!post) {
      res.status(422).json({ error: "Not found!", })
    }
    console.log(post.postedBy._id.toString(),req.user.id)
    if (post.postedBy._id == req.user.id) {
      console.log("matched")
      await post.delete()
      console.log("post deleted")
      res.status(200).json({message:"Post deleted successfully!"})
    }
    res.status(500).json("something happened")
  } catch (error) {
    console.log(error)
  }
})

router.delete("/deletecomment/:p_id/:c_id", requireLogin, async (req, res) => {
  try {
    const comment = { _id: req.params.c_id };
    const post = await Post.findByIdAndUpdate(req.params.p_id, {
      $pull:{comments:comment},
    },{new:true} ).populate("postedBy" , "_id name").populate("comments.postedBy" , "_id name")
    console.log("Backend: ", post);
    res.json(post);
  }catch (error) {
    res.status(422).json("already deleted!");
  }
})





module.exports = router;
