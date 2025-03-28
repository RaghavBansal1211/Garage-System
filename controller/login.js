const User = require("../model/user");
const { setUser } = require("../auth");

async function handleUserLogin(req,res){
    const {email,password} = req.body;
 

    const user = await User.findOne({email:email,password:password});
    if(!user) return res.status(404).json({
        error:'No User Found',
    });

    const token = setUser(user);
    res.cookie('uid',token);
    return res.status(200).json({
        message:"Login Successful"
    });
}

module.exports = {handleUserLogin}