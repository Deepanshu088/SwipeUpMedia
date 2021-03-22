const express = require("express");
const app = express();
require('dotenv').config();
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require('../models/blogSchema')
const Review = require('../models/reviewSchema')

const session = require("express-session");

app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 600000,
    }
}))
router.get("/", (req,res)=>{
    if(req.session.access){
        res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE+"/createBlog");
    }else{
        res.render("login");
    }
}).post("/",(req,res)=>{
    if(req.body.uname == process.env.ADMIN_USERNAME && req.body.psw == process.env.ADMIN_PASSWORD){
        req.session.access = true;
        res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE+"/createBlog");
    }else{
        res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE);
    }
})
router.get("/createBlog", (req,res)=>{
    if(req.session.access){
        res.render("adminBlog");
    }else{
        res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE);
    }
}).post("/createBlog",(req,res)=>{
    var newBlog = new Blog({
        Title : req.body.Title,
        Heading : req.body.Heading,
        Description : req.body.Description,
        ImgLink : req.body.ImgLink,
        ImgAltText : req.body.ImgAltText,
        Content : req.body.Content,
        Date : req.body.Date,
    })
    newBlog.save();
    res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE+"/createBlog");
})
router.get("/updateBlog", async (req,res)=>{
    var blogs;
    if(req.session.access){
        await Blog.find({}, (err,blogss)=>{
            if(err){
                console.log(err);
            }        
            
            res.render("updateBlog",{blogs : blogss}) 
        });
        
    }else{
        res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE);
    }
}).post("/updateBlog",(req,res)=>{
    var id = req.body.id;
    Blog.findByIdAndDelete(id, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    });
    res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE+"/createBlog");

})
router.get("/addReview",(req,res)=>{
    if(req.session.access){
        res.render("addReview");
    }else{
        res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE);
    }
}).post("/addReview",(req,res)=>{
    var newReview = new Review({
        Name : req.body.Name,
        ImgLink : req.body.ImgLink,
        Review : req.body.Review,
        Date : req.body.Date,
    })
    newReview.save();
    res.redirect("/"+process.env.SECTRET_CUSTOM_ROUTE+"/createBlog");
})



module.exports= router;