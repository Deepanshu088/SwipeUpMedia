const mongoose = require("mongoose");

const Review = new mongoose.Schema({
    Name : String,
    ImgLink : String,
    Review : String,
    Date : { type: Date, default: Date.now }
});

module.exports= mongoose.model('Review', Review);