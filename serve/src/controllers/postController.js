const Post = require("../models/post");
const PostTag = require("../models/postTag")


// Post
exports.getAllPost = async (req, res) => {
    
    try {
        const filter = {};
        if(req.query){
            filter.title = {$regex: '.*'+req.query.title+'.*'};
        }
        const allPost = await Post.find(filter).populate('tags');
        res.status(200).send({posts: allPost})
    }catch(e){
        res.status(500).send({message: e.message});
    }
}

exports.findOnePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).send({message: 'Post is not found!'});
        }

        res.status(200).send({post})
    }catch(e){
        res.status(500).send({message: e.message})
    }
}

exports.deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).send({message:'Post is not found!!'});
        }
        await post.delete();
        res.status(200).send({post})
    }catch(e){
        res.status(500).send({message: e.message});
    }
}

exports.updatePost = async (req, res) => {
    try{
        const file = req.file;
        
        if(req.body.tags){
            const tags = req.body.tags.split(',');
            req.body.tags = tags;
        }else{
            req.body.tags = [];
        }

        if(file){
            req.body.img = file.filename;
        }
        const data = {...req.body};
        const postUpdate = await Post.findOneAndUpdate(req.params.id, data, { new: true});
        if(!postUpdate){
            res.status(404).send({message: 'Post not found!'});
        }
    
        res.status(200).send({post: postUpdate})

    }catch(e){
        res.status(500).send({message: e.message});
    }
}

exports.addPost = async (req, res) => {
    try{
        const file = req.file;
        
        if(!file){
            res.status(400).send({message: 'File not found!!'});
        }
        
        if(req.body.tags){
            const tags = req.body.tags.split(',');
            req.body.tags = tags;
        }else{
            req.body.tags = [];
        }

        if(file){
            req.body.img = file.filename;
        }
        const data = {...req.body};
        const newPost = new Post(data)
        await newPost.save();
        res.status(201).send({post: newPost});
    }catch(e){
        res.status(500).send({messge: e.message})
    }
}


// Tag
exports.addPostTag = async (req, res) => {
    try{
        const newTag = new PostTag(req.body);
        await newTag.save();
        res.status(201).send({Tags: newTag});
    }catch(e){
        res.status(400).send({message: e.message})
    }   
}

exports.getAllTag = async (req, res) => {
    try{
        const allTag = await PostTag.find({}).sort({'createdAt': -1});
        res.status(200).send({Tags: allTag})
    }catch(e){
        res.status(400).send({message: e.message})
    }
}

exports.updateTag = async (req, res) => {
    try{
        const data = req.body;
        const updateData = await PostTag.findByIdAndUpdate(req.params.id, data, {
            new: true
        })
        res.status(200).send({Tag: updateData});
    }catch(e){
        res.status(400).send({message: e.message})
    }
}

exports.deleteTag = async (req, res) => {
    try{
        const tag = await PostTag.findById(req.params.id);
        if(!tag){
            res.status(500).send({message: "Tag not found!"})
        }
        await tag.delete();
        res.status(200).send({Tag: tag})
    }catch(e){
        res.status(400).send({message: e.message})
    }
}