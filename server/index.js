const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
require("dotenv").config();

const app = express();

const User = require("./models/User");
const Post = require("./models/Post");

const salt = bcrypt.genSaltSync(10);
const secret = "cookiecookie";

app.use(
  cors({
    credentials: true,
    origin: ["https://blogspot-client.onrender.com", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCreate = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json({ userCreate });
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const checkPass = bcrypt.compareSync(password, user.password);
    if (checkPass) {
      jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.status(200).cookie("token", token).json({
          id: user._id,
          username,
        });
      });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, (err, data) => {
    if (err) res.status(400).json(err);
    res.status(200).json(data);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const fileExtension = parts[parts.length - 1];
    const newPath = path + "." + fileExtension;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    jwt.verify(token, secret, async (err, data) => {
      if (err) {
        return res.status(400).json(err);
      }
      const { title, summary, content } = req.body;
      const postCreated = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: data.id,
      });
      // console.log(postCreated)
      res.status(200).json(postCreated);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/post", upload.single("file"), async (req, res) => {
  try {
    const { id, title, summary, content } = req.body;
    const { token } = req.cookies;
    let updatedFields = { title, summary, content };

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const fileExtension = parts[parts.length - 1];
      const newPath = path + "." + fileExtension;
      fs.renameSync(path, newPath);
      updatedFields.cover = newPath;
    }

    jwt.verify(token, secret, async (err, data) => {
      if (err) return res.status(400).json(err);

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.author.toString() !== data.id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      Object.assign(post, updatedFields);
      const updatedPost = await post.save();

      res.status(200).json(updatedPost);
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(10);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", ["username"]);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: "Error retrieving post", error });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected");
    console.log(`Server is running at ${process.env.PORT}!`);
  } catch (error) {
    console.log(error);
  }
});
