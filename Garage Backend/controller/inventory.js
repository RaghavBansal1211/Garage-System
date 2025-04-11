const Stock = require("../model/stock");
const ProductOrder = require("../model/ProductOrder");

async function handleAddProduct(req,res){
    try{
        const body = req.body;
        const partName = body.partName;
        const quantity = body.quantity;
        const reorderLevel = body.reorderLevel;
        const pricePerUnit = body.pricePerUnit;
        if(partName && quantity && reorderLevel && pricePerUnit){
            const result = await Stock.create({
                partName:partName,
                quantity:quantity,
                reorderLevel:reorderLevel,
                pricePerUnit:pricePerUnit
            })
        
            return res.status(200).json({
                message:"Product added successfully",
                data: result,
                success:true
            })
        }
        return res.status(404).json({
            message:"All fields are required"
        })
        
    }
   

    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}


async function handleUpdateProduct(req,res){

    try{
        const id = req.params.id;
        const body = req.body;
        const result = await Stock.findByIdAndUpdate(
            id,
            { $set: body }, 
            { new: true, runValidators: true }
        );

        if(!result) return res.status(404).json({error:"record not found"});
        return res.status(200).json({
            message:"product updated successfully",
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

async function handleGetAllProducts(req,res){
    try{
        const result = await Stock.find({});
        if(!result) return res.status(404).json({error:"record not found"});
        return res.status(200).json({
            message:"products fetched successfully",
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


async function handleDeleteProduct(req,res){
    try{
        const id = req.params.id;
        const result = await Stock.findOneAndDelete({_id:id});
        if(!result) return res.status(404).json({error:"record not found"});
        return res.status(200).json({
            message:"product deleted successfully",
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



async function handleGetLowQuantityProducts(req,res){
    try{
        const lowStockItems = await Stock.find({
            $expr: { $lt: ["$quantity", "$reorderLevel"] }
        });   
        
        return res.status(200).json({
            message:"Low Quantity products extracted",
            data:lowStockItems,
            success:true
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error:err.message
        })
    }
}


async function raisePO(req,res){
    try{
        const body = req.body;
        const products = body.products;
        const result = await ProductOrder.create({
           products:products,
           status:"Pending"
        })

        return res.status(200).json({
            message:"PO Raised Successfully",
            data:result,
            success:true
        })
         
    }
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error:err.message
        })
    }
}


async function handleGetAllPOs(req,res){
    try{
        const result = await ProductOrder.find({});
        return res.status(200).json({
            message:"All Product Order fetched successfully",
            data:result,
            success:true
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error:err.message
        })
    }
}



module.exports = {handleAddProduct,handleUpdateProduct,handleGetAllProducts,handleDeleteProduct,handleGetLowQuantityProducts,raisePO,handleGetAllPOs}