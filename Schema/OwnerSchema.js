import mongoose from 'mongoose';

const OwnerSchema = new mongoose.Schema({
    Type:[{
        type:String,
        required:true,
    }],
    Wallet:{
        type:String,
        required:true,
    },
    Photo:{
        type:String,
        required:true,
    },
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    ArtistNick:{
        type:String,
        required:true,
    },
    CreativeInvolvement:{
        type:String,
        required:true,
    },
    Plan:{
        type:String,
        required:true,
    },
    Bio:{
        type:String,
        required:true,
    },
    Signature:{
        type:String,
        required:true,
    },
})
export default mongoose.model('Owner', OwnerSchema)