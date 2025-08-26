const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./config/keys");

if (process.env.NODE_ENV != "production") {
  const morgan = require("morgan");
  app.use(morgan("common"));
}

// Connecting to Mongo DB Cloud
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
////////////////////

// Regestering the user model in app.js
require("./models/user");
require("./models/post");

// Regestering the routers
app.use(express.json()); // parses the post requests and send to routes
app.use(require("./routes/auth")); // route handelers externally
app.use(require("./routes/post"));
app.use(require("./routes/users"));


if (process.env.NODE_ENV === "production") {
  const path = require("path")
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
}

app.listen(PORT, () => {
  console.log("Server is running at localhost:", PORT);
});
