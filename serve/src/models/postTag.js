const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostTagSchema = new Schema({
    title: {
        type: String,
        required:true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: Number,
        required:true,
    }
}, { timestamps: true})

PostTagSchema.methods.toJSON =  function (){
    const tag = this;
    const tagObject =  tag.toObject();
    return tagObject
}

const PostTag = mongoose.model('PostTag', PostTagSchema);
module.exports = PostTag;