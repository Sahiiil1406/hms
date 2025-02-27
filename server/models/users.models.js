const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
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
},{
    timestamps:true,
});


//hashes the password before saving it to the database
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 12);
    }
    next();
});

const User=mongoose.model('User', userSchema);
module.exports=User;
