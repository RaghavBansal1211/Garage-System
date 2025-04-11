const { getUser } = require("../auth");
const User = require("../model/user");



async function handleGetMe(req,res){
    try {
        const user = getUser(req.cookies.uid);
        console.log(user);
        if (!user) return res.status(401).json({ error: 'Unauthorized' })
        const result = await User.findOne({_id:user._id});
        return res.status(200).json({
            message:"Current User Fetched Successfully",
            details:{name:result.name,
                    role:result.role,
                    email:result.email,
                    phone:result.phone
                }
            })
      } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch user' });
      }
}

module.exports = {handleGetMe}