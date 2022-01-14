const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectID } = Schema.Types;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectID,
    ref: "User",
  },
  likes: [
    {
      type: ObjectID,
      ref: "User",
    },
  ],
  comments: [
    {
      text: {
        type : String
      },
      postedBy: {
        type: ObjectID,
        ref: "User"
      }
    }
  ],
},{timestamps:true});
// { typeKey: '$type' } auto detect type of entry
mongoose.model("Post", postSchema);
