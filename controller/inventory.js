const Stock = require("../model/stock");


async function handleAddProduct(req,res){
    const body = req.body;
    const partName = body.partName;
    const quantity = body.quantity;
    const reorderLevel = body.reorderLevel;
    const pricePerUnit = body.pricePerUnit;

    const result = await Stock.create({
        partName:partName,
        quantity:quantity,
        reorderLevel:reorderLevel,
        pricePerUnit:pricePerUnit
    })

    return res.status(200).json({
        message:"Product added successfully",
        data: result
    })
}


async function handleUpdateProduct(req,res){
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


async function handleDeleteProduct(req,res){
    const id = req.params.id;
    const result = await Stock.findOneAndDelete({_id:id});
    if(!result) return res.status(404).json({error:"record not found"});
    return res.status(200).json({
        message:"product deleted successfully",
        data:result
    })
}


module.exports = {handleAddProduct,handleUpdateProduct,handleDeleteProduct}