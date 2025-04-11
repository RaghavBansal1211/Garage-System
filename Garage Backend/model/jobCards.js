const mongoose = require("mongoose");

const jobCardSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    odometer:{
        type:Number,
        required:true,
    },
    fuelLevel:{
        type:String,
        required:true
    },
    issues:[
        {
           type:String,
           required:true
        }
    ],
    partsNeeded:[
        {
            partName:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    estimatedCost:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:"Pending"
    }

},{timestamps:true})

const JobCard = mongoose.model('jobCard',jobCardSchema);
module.exports = JobCard;

