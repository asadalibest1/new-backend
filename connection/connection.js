import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const Connectdb = () =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('DB Connected'))
    .catch((e)=>console.log(e))
}

export default Connectdb;