const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config/env/local.env" });

const port = process.env.PORT || 8000;
const db = require("./config/db");

// include router
const postRoutes = require("./modules/posts/post.router");

// enable preflight requests
app.use(cors());

// parsing body request
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false }));

//routing
app.use(process.env.ENDPOINT_API + "/posts", postRoutes);

// starting server
app.listen(port, () => {
  // connection test
  db.connect((err) => {
    if (err) console.error(err);
  });
  console.log(`server is listening on port ${port}`);
});
