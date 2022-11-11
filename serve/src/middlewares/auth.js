const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        const user = await User.findById({_id: decode._id});

        if(!user){
            throw new Error('UnAuthenrization!');
        }

        delete user.password;
        
        req.user = user;
        next();
    }catch(e){
        res.status(401).send({message: 'Permision Denied!'})
    }
}


module.exports = auth;