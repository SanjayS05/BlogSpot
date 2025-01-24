const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

const User = require('./models/User');

const salt = bcrypt.genSaltSync(10);
const secret = "cookiecookie";

app.use(cors({credentials: true, origin:'http://localhost:5173'})); 
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://Blogs:blogs@blogging.pculr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userCreate = await User.create({ username, password: bcrypt.hashSync(password, salt) });
        res.status(200).json({userCreate});
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const checkPass = bcrypt.compareSync(password,user.password);
        if(checkPass)
        {
            jwt.sign({username,id:user._id}, secret, {}, (err,token) =>{
                if(err) throw err;
                res.cookie("token",token).json('ok');
            })
        } 
        else
        {
            res.status(400).json({message: "Invalid password"});
        }
    }catch(err){
        res.status(400).json(err);
    }
})

app.get('/profile' , (req,res) =>{
    res.json(req.cookies);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});