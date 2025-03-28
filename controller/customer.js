const Customer = require("../model/customer");

async function handleCreateCustomer(req,res){
    const body = req.body;

    const name = (body.name!=null) ? body.name : null;
    const phone = (body.phone!=null) ? body.phone : null;
    const address = (body.address!=null) ? body.address : null;
    const vehicle = (body.vehicles!=null) ? body.vehicles : null;
    if(name && phone && address){
        const data = await Customer.create({
            name:name,
            phone:phone,
            address:address,
            vehicles: vehicle ? vehicle : [],
        });

        return res.status(200).json({
            message:"success",
            data:data,
        });
    }
    else return res.status(400).json({error:"All fields are required"});   
}


async function handleDeleteCustomer(req,res){
    const id = req.params.id;
    const result = await Customer.findOneAndDelete({_id:id});
    if(!result) return res.status(404).json({error:"record not found"});
    return res.status(200).json({
        message:"customer deleted successfully",
        data:result
    })
}


async function handleUpdateCustomer(req,res){
    const id = req.params.id;
    const body = req.body;
    
    const result = await Customer.findByIdAndUpdate(
        id,
        { $set: body }, 
        { new: true, runValidators: true }
      );

    if(!result) return res.status(404).json({error:"record not found"});
    return res.status(200).json({
        message:"customer updated successfully",
        data:result
    })
}


async function handleUpdateCustomerVehicle(req,res){
    const id = req.params.id;
    const body = req.body;
    const result = await Customer.findByIdAndUpdate(
        id,
        {$push:
            {vehicles:
                body
            }
        },
        { new: true, runValidators: true }
      );

    if(!result) return res.status(404).json({error:"record not found"});
    return res.status(200).json({
        message:"customer vehicle updated successfully",
        data:result
    })
}


module.exports = {handleCreateCustomer,handleDeleteCustomer,handleUpdateCustomer,handleUpdateCustomerVehicle}
