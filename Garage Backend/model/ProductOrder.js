const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
   products:[
     {
        productName:{
            type:String,
            required:true,
        },
        quantity:{
            type:Number,
            required:true
        }
     }
   ],
   status:{
    type:String,
    required:true
   }

},{timestamps:true})

const ProductOrder = mongoose.model('productOrder',purchaseOrderSchema);
module.exports = ProductOrder;

