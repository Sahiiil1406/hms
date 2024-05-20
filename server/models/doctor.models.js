const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
    },
    Address:{
        type:String,
        
    },
    specialization:{
        type:String,
        default:'General Physician'
    },
    department:{
        type:String,
        
    },
    qualification:{
        type:String,
        
    },
    experience:{
        type:String,
       
    },
    consultationFee:{
        type:Number,
        default:1500
    },
    profilePic:{
        type:String,
    },
},{
    timestamps:true,
});

doctorSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 12);
    }
    next();
});

const Doctor=mongoose.model('Doctor', doctorSchema);
module.exports=Doctor;