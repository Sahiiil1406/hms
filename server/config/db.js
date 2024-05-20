const mongoose =require('mongoose');

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb Connecteed")
        
    } catch (error) {
        return error
    }
}

module.exports=connectDb;