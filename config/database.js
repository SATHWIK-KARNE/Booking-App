import mongoose from "mongoose";

let connected=false;

const connectDB= async ()=>{
  mongoose.set('strictQuery','true'); //ensures only fields in schema will be saved in DB

  // here we are not using express backend,but using nextJS api routes
  // they work same as serverless functions.(we just type api and it automatically connects to db and do operations like crud)

  // if db is already connected=>
    if(connected) {
      console.log("MongoDB is already connected....!");
      return;
    }
    // connect to MONGODB
    try{
      await mongoose.connect(process.env.MONGODB_URI);
      connected=true;
      console.log("MongoDB is successfully connected..........!");
    }
    catch(error){
      console.log("Error in connecting MongoDB: ",error);
    }

}

export default connectDB;