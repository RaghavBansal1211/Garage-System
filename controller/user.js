const User = require("../model/user");

async function handleCreateUser(req,res){
    const {name,email,password,phone,role} = req.body;

    const result = await User.create({
        name,
        email,
        password,
        phone,
        role
    })

    return res.status(200).json({
        message:"new "+ role+ " created Successfully",
        data: result
    })
}

async function handleDeleteUser(req,res){
    const id = req.params.id;

    const result = await User.findOneAndDelete({_id:id})

    return res.status(200).json({
        message:result.role + " " + result.name + " deleted Successfully",
        data: result
    })
}


module.exports = {handleCreateUser,handleDeleteUser}
