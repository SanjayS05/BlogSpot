const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

require('dotenv').config();

const app = express();

const User = require("./models/User");
const Post = require("./models/Post");

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const setCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
  
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

        const checkPass = bcrypt.compareSync(password,user.password);
        if(checkPass)
        {
            jwt.sign(
              {username,id:user._id}, 
              secret, 
              {expiresIn: '24h'}, // Fixed expiration format
              (err,token) =>{
                if(err) throw err;
                res.status(200)
                   .cookie("token", token, setCookieOptions())
                   .json({
                      id:user._id,
                      username
                });
            })
        } 
        else
        {
            res.status(400).json({message: "Invalid password"});
        }
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})
  
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'Authentication required. Please log in.' });
    }
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired. Please log in again.' });
        }
        return res.status(401).json({ error: 'Invalid authentication token.' });
      }
      res.json(info);
    });
});
  
app.post("/logout", (req,res) =>{
    res.cookie('token', '', { 
      ...setCookieOptions(),
      expires: new Date(0)
    }).json('ok');
})  
  
// Middleware for token verification
const authenticateToken = (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired. Please log in again.' });
      }
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }
    req.user = user;
    next();
  });
};

app.post('/post', authenticateToken, uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    try {
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:req.user.id,
      });
      res.json(postDoc);
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
});
  
app.put('/post', authenticateToken, uploadMiddleware.single('file'), async (req,res) => {
    try {
      let newPath = null;
      if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
      }
  
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      
      if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(req.user.id);
      if (!isAuthor) {
        return res.status(403).json({ error: 'You are not authorized to edit this post' });
      }

      postDoc.set({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
      await postDoc.save();
  
      res.json(postDoc);
    } catch (error) {
      res.status(500).json({ error: 'Error updating post' });
    }
});
  
app.get('/post', async (req,res) => {
    try {
      const posts = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
});
  
app.get('/post/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const postDoc = await Post.findById(id).populate('author', ['username']);
      if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(postDoc);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching post' });
    }
});

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    console.log(`Server is running at port ${process.env.PORT}!`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});
