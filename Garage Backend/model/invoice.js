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
            partName:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            unitPrice: {
                type: Number,
                required: true
            }
            
        }
    ],
    laborCharges:{
        type:Number,
        required:true
    },
    Amountstatus:{
        amountPaid:{
            type:Number,
            required:true,
        },
        
        status:{
            type:String,
            required:true,
        }
    }

},{timestamps:true})

const Invoice = mongoose.model('invoice',invoiceSchema);
module.exports = Invoice;

