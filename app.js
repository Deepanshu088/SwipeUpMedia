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


const app = express();
const router = express.Router();
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static(__dirname+"/views"));
app.use("/",express.static(__dirname+"/models"));
app.use("/",express.static(__dirname+"/public"));

const port = process.env.PORT || 3000;

app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1800000,
    }
}))

const Kitten = require("./models/test.js");

// const tom  = new Kitten({name : "Tommy"});
// tom.save();

router.get("/",(req,res)=>{
    res.render("home");
})
router.get("/blogs",(req,res)=>{
    res.render("blogSample");
})
router.get("/test",(req,res)=>{
    res.render("test");
})

app.use("/",router);

app.listen(port,()=>{
    console.log("server is running at "+ port);
});