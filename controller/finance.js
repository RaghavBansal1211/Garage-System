const ProductOrder = require("../model/ProductOrder");

async function handleUpdateProductOrders(req,res){
    try{
        const status = req.body.status;
        const id = req.params.POid;

        const result = await ProductOrder.findByIdAndUpdate(
            id,
            { status: status },   
            { new: true }   
        );
        return res.status(200).json({
            message: "Status Updated Successfully",
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




module.exports = {handleUpdateProductOrders};