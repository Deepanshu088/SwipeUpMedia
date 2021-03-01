const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require('../models/blogSchema')


// router.get("/",(req,res)=>{
//     res.render("blogSample");
// })

router.get('/:_id', async function (req, res) {
    var x = req.params;
    var blog;
    var popularBlogs;
    await Blog.findOne({_id : x._id},(err,data)=>{
        if(err){
            console.log(err);
        }
        blog=data;
    })
    await Blog.find({}).sort({Views : -1}).limit(5).exec((err, data)=>{
        if(err){
            console.log(err);
        }
        // popularBlogs = data;    
        res.render("blogSample",{blog : blog, popularBlogs : data });
    })
})



module.exports= router;