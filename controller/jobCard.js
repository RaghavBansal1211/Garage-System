const JobCard = require("../model/jobCards");
const Customer = require("../model/customer");
const Stock = require("../model/stock")

async function returnProductsToStock(partsNeeded){
    for (const part of partsNeeded) {
        const { partName, quantity } = part;
        await Stock.findOneAndUpdate(
            { partName },
            { $inc: { quantity: quantity } },
            { new: true }
        );
    }
}

async function removeProductFromStocks(partsNeeded) {
    for (const part of partsNeeded) {
        const { partName, quantity } = part;

        await Stock.findOneAndUpdate(
            { partName },
            { $inc: { quantity: -quantity } },
            { new: true }
        );
    }
}




async function handleCreateJobCard(req,res){


    try{
        const cusId = req.params.cusId;
        const vehId = req.params.vehId;
        const body = req.body;
        const odometer = body.odometer;
        const fuelLevel = body.fuelLevel;
        const issues = body.issues;
        const partsNeeded = body.partsNeeded;
        const estimatedCost = body.estimatedCost;

        removeProductFromStocks(partsNeeded);

        const vehicle = await Customer.findOne(
            { vehicles: { $elemMatch: { _id: vehId } } },
            {"vehicles.$":1}
        );
    
        const result = await JobCard.create({
            customerId : cusId,
            vehicleNumber : vehicle.vehicles[0].vehicleNumber,
            odometer:odometer,
            fuelLevel:fuelLevel,
            issues:issues,
            partsNeeded:partsNeeded,
            estimatedCost:estimatedCost
        })
    
        return res.status(200).json({
            message:"job card created successfully",
            data:result
        })    
    }
    

    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}


async function handleUpdateJobCardStatus(req,res){
    try{
        const id = req.params.JobCardId;
        const result = await JobCard.findByIdAndUpdate(
            id,
            {status:"Approved"},
            {new:true}
        )
        return res.json({
            message:"Status updated to Approved",
            data:result
        })

    }
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error:err.message
        })
    }
}


async function handleCancelJobCard(req,res){
    try{
        const JobCardId = req.params.JobCardId;
        const result = await JobCard.findOne({_id:JobCardId});
        returnProductsToStock(result.partsNeeded);
        result.status = "Cancelled";
        await result.save();

        return res.status(200).json({
            message:"Job Card Cancelled Successfully",
            data:result,
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
    
}



module.exports = {handleCreateJobCard,handleCancelJobCard,handleUpdateJobCardStatus}