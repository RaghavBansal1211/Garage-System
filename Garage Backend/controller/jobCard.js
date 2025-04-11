const JobCard = require("../model/jobCards");
const Customer = require("../model/customer");
const Stock = require("../model/stock")
const mongoose = require('mongoose');

async function handleCreateJobCard(req, res) {
    try {
      const cusId = req.params.cusId;
      const vehId = req.params.vehId;
      const {
        odometer,
        fuelLevel,
        issues,
        partsNeeded,
        estimatedCost
      } = req.body;
  
      
      for (const part of partsNeeded) {
        const { partName, quantity } = part;
        const updated = await Stock.findOneAndUpdate(
          { partName },
          { $inc: { quantity: -quantity } },
          { new: true }
        );
        if (!updated) {
          return res.status(400).json({ message: `Part ${partName} not found in stock.` });
        }
      }
  
      const vehicle = await Customer.findOne(
        { vehicles: { $elemMatch: { _id: vehId } } },
        { "vehicles.$": 1 }
      );
  
      if (!vehicle || !vehicle.vehicles.length) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      const result = await JobCard.create({
        customerId: cusId,
        vehicleNumber: vehicle.vehicles[0].vehicleNumber,
        odometer,
        fuelLevel,
        issues,
        partsNeeded,
        estimatedCost,
        status: "Pending"
      });
  
      return res.status(200).json({
        message: "Job card created successfully",
        data: result
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error",
        error: err.message
      });
    }
  }
  


  async function handleCancelJobCard(req, res) {
    try {
      const JobCardId = req.params.JobCardId;
      const result = await JobCard.findOne({ _id: JobCardId });
  
      if (!result) {
        return res.status(404).json({ message: "Job card not found" });
      }
  
      // Add parts back to stock
      for (const part of result.partsNeeded) {
        const { partName, quantity } = part;
        const updated = await Stock.findOneAndUpdate(
          { partName },
          { $inc: { quantity: quantity } },
          { new: true }
        );
        if (!updated) {
          return res.status(400).json({ message: `Part ${partName} not found in stock.` });
        }
      }
  
      result.status = "Cancelled";
      await result.save();
  
      return res.status(200).json({
        message: "Job Card Cancelled Successfully",
        data: result
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error",
        error: err.message
      });
    }
  }
  


async function handleUpdateJobCardStatus(req,res){
    try{
        const id = req.params.JobCardId;
        const status = req.body.status;
        const result = await JobCard.findByIdAndUpdate(
            id,
            {status:status},
            {new:true}
        )
        if(!result) return res.status(404).json({
            message:"No Job card found"
        })
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


async function handleGetAllJobCards(req, res) {
  try {
    const jobCards = await JobCard.find({});

    const enrichedJobCards = await Promise.all(
      jobCards.map(async (card) => {
        const customer = await Customer.findById(card.customerId).select('name');
        return {
          ...card.toObject(),
          customerName: customer ? customer.name : 'Unknown',
        };
      })
    );

    console.log(enrichedJobCards);

    return res.status(200).json({
      message: 'All Job Cards Fetched Successfully',
      details: enrichedJobCards,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
    });
  }
}






module.exports = {handleCreateJobCard,handleCancelJobCard,handleUpdateJobCardStatus,handleGetAllJobCards}