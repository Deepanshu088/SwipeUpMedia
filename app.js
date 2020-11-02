const express = require("express");
const http = require("http");
const ejs = require("ejs");
const bodyParser = require("body-parser");
require('dotenv').config();
const session = require("express-session");

const app = express();
const router = express.Router();
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static(__dirname+"/views"));
app.use("/",express.static(__dirname+"/controllers"));
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

app.use("/",router);

app.listen(port,()=>{
    console.log("server is running at "+ port);
});