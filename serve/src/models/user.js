const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required:true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    address:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
});

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    return userObject;
}

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

userSchema.methods.getAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}, process.env.JWT_ACCESS_KEY);
    return token;
}

userSchema.statics.findByCredential = async (email, password) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('User not Found!!');
    }

    const isMatchPass = await bcrypt.compare(password, user.password);

    if(!isMatchPass){
        throw new Error('Password incorret!');
    }

    return user;
}
const User = mongoose.model('User', userSchema);

module.exports = User;