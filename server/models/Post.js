const mongoose = require("mongoose");
const { model } = mongoose

const PostSchema = new mongoose.Schema(
    {
        title:String,
        summary:String,
        content:String,
        cover:String,
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
    },{
        timestamps:true,
});

const PostModel = model('Post', PostSchema)

module.exports = PostModel;