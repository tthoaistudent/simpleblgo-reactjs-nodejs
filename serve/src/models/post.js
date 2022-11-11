const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    img: {
        type: String
    },
    publish: {
        type: Boolean,
        required: true
    },
    enableComment: {
        type: Boolean,
        required: true
    },
    tags: [
        { type: Schema.Types.ObjectId, ref: 'PostTag'}
    ],
    metaTitle: {
        type: String,
        required: true,
    },
    metaDescription: {
        type: String,
        required: true
    }
})


const Post = mongoose.model('Post', postSchema);
module.exports = Post;