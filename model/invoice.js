const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    jobCardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobCard",
    }, 
    finalAmount:{
        type:Number,
        required:true,
    },
    gst:{
        type:Number,
        default:18
    },
    partsUsed:[
        {
            type:String,
            required:true
        }
    ],
    laborCharges:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }

},{timestamps:true})

const Invoice = mongoose.model('invoice',invoiceSchema);
module.exports = Invoice;

