const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = (async (res,req) =>{
    try {
        const { username, password } = req.body;
        const userCreate = await User.create({ username, password: bcrypt.hashSync(password, salt) });
        res.status(200).json({userCreate});
    } catch (error) {
        res.status(400).json(error);
    }
})

const login = (async (res,req) => {
    try {
        const { username, password } = req.body;
        const user = await User
            .findOne({ username })
            .select('password');
        

    }catch(err){

    }
})