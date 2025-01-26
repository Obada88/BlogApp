import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    authorImg:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    }

})

const Blog_Model =mongoose.models.blog || mongoose.model('blog',schema);

export default Blog_Model