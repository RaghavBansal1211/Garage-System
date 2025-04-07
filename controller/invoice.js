const Invoice = require("../model/invoice");
const JobCard = require("../model/jobCards");
const Stock = require("../model/stock");

async function getPrice(partName){
     const result = await Stock.findOne({partName:partName});
     if(!result) throw new Error('Item not found');
     return result.pricePerUnit;
}


async function handleCreateInvoice(req,res){

     try{
          const jobId = req.params.JobCardId;
          const body = req.body;
          const laborCharges = body.laborCharges;
          const job = await JobCard.findById(jobId);
          const partsUsed = job.partsNeeded;
          const gst = (body.gst) ? body.gst : 18;

          let finalAmount = 0;
          for(let {partName,quantity} of partsUsed){
               const price = await getPrice(partName);
               finalAmount += price * quantity;
          }
          finalAmount+=laborCharges;
          finalAmount = finalAmount + ((finalAmount*gst)/100)

          const result = await Invoice.create({
               jobCardId:jobId,
               finalAmount:finalAmount,
               gst:gst,
               partsUsed:partsUsed,
               laborCharges:laborCharges,
               Amountstatus:{
                    amountPaid:0,
                    status:"Pending"
               }
          })

          return res.status(200).json({
               message:"Invoice Created Successfully",
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


async function handleGetAllInvoices(req,res){
     try{
          const result = await Invoice.find({});
          return res.status(200).json({
              message:"All Invoices fetched Successfully",
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

async function handleUpdateInvoiceStatus(req, res) {
     try {
         const id = req.params.InvoiceId;
         const newPayment = req.body.amountPaid;
 
         const result = await Invoice.findOneAndUpdate(
             { _id: id },
             [
                 {
                     $set: {
                         "Amountstatus.amountPaid": { $add: ["$Amountstatus.amountPaid", newPayment] }
                     }
                 },
                 {
                     $set: {
                         "Amountstatus.status": {
                             $cond: {
                                 if: { $gte: ["$Amountstatus.amountPaid", "$finalAmount"] },
                                 then: "paid",
                                 else: "due"
                             }
                         }
                     }
                 }
             ],
             { new: true }
         );
 
         if (!result) {
             return res.status(404).json({ message: "Invoice not found" });
         }
 
         return res.status(200).json({
             message: "Payment Status Updated Successfully",
             data: result
         });
 
     } catch (err) {
         return res.status(500).json({
             message: "Server Error",
             error: err.message
         });
     }
 }
 
 

module.exports = {handleCreateInvoice,handleGetAllInvoices,handleUpdateInvoiceStatus};