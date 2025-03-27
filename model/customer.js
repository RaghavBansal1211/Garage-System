const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    vehicles:[
        {
            vehicleNumber:{
                type:String,
                required:true,
                unique:true
            },
            make:{
                type:String,
                required:true
            },
            model:{
                type:String,
                required:true,
            },
            manufacturer:{
                type:String,
                required:true
            }
        }
    ],

},{timestamps:true})

const Customer = mongoose.model('customer',customerSchema);
module.exports = Customer;

