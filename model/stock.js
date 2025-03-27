const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    partName:{
        type:String,
        required:true
    }, 
    quantity:{
        type:Number,
        required:true,
    },
    reorderLevel:{
        type:Number,
        required:true,
    },
    pricePerUnit:{
        type:Number,
        required:true
    }
    
},{timestamps:true})

const Stock = mongoose.model('stock',stockSchema);
module.exports = Stock;

