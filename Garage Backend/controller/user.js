const { getUser } = require("../auth");
const User = require("../model/user");

async function handleCreateUser(req,res){

    try{
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
            details: result
        })
    }
    
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}

async function handleDeleteUser(req,res){

    try{
        const id = req.params.id;
        const result = await User.findOneAndDelete({_id:id})
        return res.status(200).json({
            message:result.role + " " + result.name + " deleted Successfully",
            data: result
        })
    }
    
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}


async function handleGetAllUsers(req, res) {
    try {
      const result = await User.find({ role: { $nin: ["SUPERADMIN", "ADMIN"] } })
                               .select("-password");
  
      return res.status(200).json({
        message: "All Users Fetched",
        details: result 
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error",
        error: err.message
      });
    }
  }
  



module.exports = {handleCreateUser,handleDeleteUser,handleGetAllUsers}
