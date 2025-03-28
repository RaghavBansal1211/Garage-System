const JobCard = require("../model/jobCards");
const Customer = require("../model/customer");

async function handleCreateJobCard(req,res){
    const cusId = req.params.cusId;
    const vehId = req.params.vehId;
    const body = req.body;
    const odometer = body.odometer;
    const fuelLevel = body.fuelLevel;
    const issues = body.issues;
    const partsNeeded = body.partsNeeded;
    const estimatedCost = body.estimatedCost;

    // console.log(vehId);

    const vehicle = await Customer.findOne(
        { vehicles: { $elemMatch: { _id: vehId } } },
        {"vehicles.$":1}
      );

    // console.log(vehicle.vehicles[0].vehicleNumber);

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

module.exports = {handleCreateJobCard}