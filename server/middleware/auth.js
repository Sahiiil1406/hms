
const Doctor=require('../models/users.models.js');
const User=require('../models/doctor.models.js');
const jwt=require('jsonwebtoken');

const auth=async(req, res, next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({msg:"No Token, Authorization Denied"});
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const user=await User.findOne({_id:decoded.id}) || await Doctor.findOne({_id:decoded.id});
        if(!user){
            return res.status(400).json({msg:"User Not Found"});
        }
        req.user=user;
        next();

} catch (error) {
        res.status(401).send({error});
    }
}

module.exports=auth;