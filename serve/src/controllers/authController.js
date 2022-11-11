const User = require("../models/user");

exports.login = async (req, res) =>{
    try{
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.getAuthToken();
        res.status(200).send({token, user});
    }catch(e){
        res.status(400).send({message: e.message})
    }
}