const express = require("express");
const http = require("http");
const ejs = require("ejs");
const bodyParser = require("body-parser");
require('dotenv').config();
const session = require("express-session");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://baby:baby1234@cluster0.iu28p.mongodb.net/Swipe?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Database :)");
});
const Blog = require('./models/blogSchema');
const Review = require('./models/reviewSchema');


const app = express();
const router = express.Router();
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static(__dirname+"/views"));
app.use("/",express.static(__dirname+"/models"));
app.use("/",express.static(__dirname+"/public"));
app.use("/",express.static(__dirname+"/controllers"));

const adminRoute = require("./controllers/adminRoute");
const blogsRoute = require("./controllers/blogsRoute");


const port = process.env.PORT || 3000;

app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1800000,
    }
}))

// Blog.updateMany({},{Views : 1},(err,docs)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(docs);
// });

router.get("/", async(req,res)=>{
    var blogs;
    var reviews;
    await Blog.find({}).sort({Date : -1}).limit(4).exec((err, data)=>{
        if(err){
            console.log(err);
        }
        data.forEach((doc)=>{console.log(doc.Date)})
        blogs = data;
    })
    await Review.find({},(err,reviewss)=>{
        if(err){
            console.log(err);
        }
        reviews = reviewss;
    })
    res.render("home",{blogs: blogs, reviews : reviews });
})


// router.get("/test",(req,res)=>{
//     res.render("test");
// })

router.use("/"+process.env.SECTRET_CUSTOM_ROUTE, adminRoute);
router.use("/blogs/", blogsRoute);

app.use("/",router);

app.listen(port,()=>{
    console.log("server is running at "+ port);
});