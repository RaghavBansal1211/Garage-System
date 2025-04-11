const User = require("../model/user");
const { setUser } = require("../auth");

async function handleUserLogin(req,res){

    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email,password:password});
        if(!user) return res.status(404).json({
            error:'No User Found',
        });

        const token = setUser(user);
    
        res.cookie('uid', token);

        return res.status(200).json({
            message:"Login Successful",
            details:{name:user.name,
                  role:user.role,
                  email:user.email,
                  phone:user.phone
            }
        });
    }
    
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }
}

async function handleUserLogout(req,res){
    try{
        res.clearCookie('uid');
        return res.json({ success: true, message: 'Logged out successfully' });
    }
   
    catch(err){
        return res.status(500).json({
            message:"Server Error",
            error: err.message
        })
    }

}

module.exports = {handleUserLogin,handleUserLogout}