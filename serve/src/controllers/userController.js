const { use } = require('bcrypt/promises');
const User = require('../models/user')


exports.getAllUser = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send({users})
    }catch(e){
        res.status(400).send(e);
    }
    
}

exports.createUser = async (req, res) =>{
    try{
        const newUser = new User(req.body);
        await newUser.save()
        res.status(201).send(newUser)
    }catch(e){
        res.status(400).send(e.message);
    }
}

exports.findOneUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).send({message: "User not found!!"});
        }

        res.status(200).send(user);
    }catch(e){
        res.status(400).send();
    }
}

exports.getProfile = async (req, res) =>{
    try{
        const user = req.user;
        res.status(200).send({user});
    }catch(e){
        
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).send({message: 'User Not Found'});
        }
        await user.delete()
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e.message);
    }
}

exports.updateProfile = async (req, res) => {
    try{
        const data = req.body;
        const updateUser = await User.findByIdAndUpdate(req.user._id, data,{
            new: true
        })
        res.status(200).send({user: updateUser});
    }catch(e){
        res.status(400).send(e.message);
    }
}

