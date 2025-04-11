const Customer = require("../model/customer");

async function handleCreateCustomer(req,res){
    try{
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
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}


async function handleDeleteCustomer(req,res){
    try{
        const id = req.params.id;
        const result = await Customer.findOneAndDelete({_id:id});
        if(!result) return res.status(404).json({error:"record not found"});
        return res.status(200).json({
            message:"customer deleted successfully",
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


async function handleUpdateCustomer(req,res){
    try{
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
    
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}


async function handleUpdateCustomerVehicle(req,res){
    try{
        const id = req.params.id;
        const body = req.body;
        const vehicle = body.vehicles;
        if(!vehicle) return res.status(404).json({
            message:"Vehicle Info not Found"
        })
   
        const result = await Customer.findByIdAndUpdate(
            id,
            {$push:
                {vehicles: vehicle
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
    

    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
    
}


async function handleGetCustomer(req,res){
    try{
        const result = await Customer.find({});
        if(!result) return res.status(404).json({error:"record not found"});
        return res.status(200).json({
            message:"fetched all customers successfully",
            details:result
        })
    }

   
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}


module.exports = {handleCreateCustomer,handleDeleteCustomer,handleUpdateCustomer,handleUpdateCustomerVehicle,handleGetCustomer}
