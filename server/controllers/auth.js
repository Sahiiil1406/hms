const User=require('../models/users.models');
const Doctor=require('../models/doctor.models');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const userSignup=async(req, res)=>{
    const {name, email, password, phoneNo, profilePic,Address}=req.body;
    try {
        
       if(!name || !email || !password){
              return res.status(400).json({msg:"Please Fill All The Fields"});
        }
        const user=await User.create({
            name,
            email,
            password,
            phoneNo,
            Address,
            profilePic
        });

        res.status(201).json({
            msg:"User SignUp Successfully",
            data:user
        });
    } catch (error) {
        res.status(400).json({error});
    }
}

const userLogin=async(req, res)=>{
    try {
        const {email, password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User NOt Found"});
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET);
        res
        .status(200)
        .cookie('token', token, {
            httpOnly:true,
            secure:false,
            sameSite:'none'
        })
        .json({
            token,
            user
        });
        
    } catch (error) {
        return res.status(400).json({error});
    }
}

const doctorSignup=async(req, res)=>{
    const {name, email, password, phoneNo, Address, specialization, department, qualification, experience, consultationFee, profilePic}=req.body;
    try {
        
        if(!name || !email || !password){
            return res.status(400).json({msg:"Please Fill All The Fields"});
        }
        console.log(req.body);
        const doctor=await Doctor.create({
            name,
            email,
            password,
            phoneNo,
            Address,
            specialization,
            department,
            qualification,
            experience,
            consultationFee,
            profilePic
        });
        res.status(201).json({
            msg:"Doctor SignUp Successfully",
            data:doctor
        });
    } catch (error) {
        res.status(400).json({error});
    }
}

const doctorLogin=async(req, res)=>{
    try {
        const {email, password}=req.body;
        const doctor=await Doctor.findOne({
            email
        });
        if(!doctor){
            return res.status(400).json({msg:"Doctor Not Found"});
        }
        const isMatch=await bcrypt.compare(password, doctor.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
        const token=jwt.sign({id:doctor._id}, process.env.JWT_SECRET);
        res
        .status(200)
        .cookie('token', token, {
            httpOnly:true,
            secure:false,
            sameSite:'none'
        })
        .json({
            token,
            doctor
        });  
    } catch (error) {
        return res.status(400).json({error});
    }
}

const userAndDoctorLogout=(req, res)=>{
    try {
        
        res.clearCookie('token');
        
        return res.status(200)
        .json({msg:"User and Doctor Logged Out Successfully"});
    } catch (error) {
        return res.status(400).json({error});
    }
}

const updateUser=async(req, res)=>{
    try {
        const userId=req.user._id;
        const{email, phoneNo, Address, profilePic,name}=req.body;
        const user=await User.findByIdAndUpdate(userId, {
            email,
            phoneNo,
            Address,
            profilePic,
            name
        }, {new:true});

        res.status(200).json({
            msg:"User Updated Successfully",
            data:user
        });
        
    } catch (error) {
        return res.status(400).json({error});
    }
}

const updateDoctor=async(req, res)=>{
    try {
        const{doctorId}=req.params;
        const{email, phoneNo, Address, profilePic,name,specialization,
            department,
            qualification,
            experience,
            consultationFee}=req.body;
        const doctor=await Doctor.findByIdAndUpdate(doctorId, {
            email,
            phoneNo,
            Address,
            profilePic,
            name,
            specialization,
            department,
            qualification,
            experience,
            consultationFee
        }, {new:true});

        res.status(200).json({
            msg:"Doctor Updated Successfully",
            data:doctor
        });
        
    } catch (error) {
        return res.status(400).json({error});
    }
}


module.exports={
    userSignup,
    userLogin,
    doctorSignup,
    doctorLogin,
    userAndDoctorLogout,
    updateUser,
    updateDoctor
}