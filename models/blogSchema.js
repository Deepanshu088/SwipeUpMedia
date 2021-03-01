const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    Title : String,
    Description : String,
    Views : Number,
    Heading : String,
    ImgLink : String,
    ImgAltText : String,
    Content : String,
    Date : { type: Date, default: Date.now },
    Comments : [{Name : String , Text : String}]
});

module.exports= mongoose.model('Blog', blogSchema);