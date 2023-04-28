import mongoose from 'mongoose';

const KybSchema = new mongoose.Schema({
    CorporateName:{
        type:String,
        required:true,
    },
    ContactEmail:{
        type:String,
        required:true,
    },
    ContactNumber:{
        type:Number,
        required:true,
    },
    CorporateAddress:{
        type:String,
        required:true,
    },
    SurnameCorporate:{
        type:String,
        required:true,
    },
    ContactCorporate :{
        type:String,
        required:true,
    },
    CompanyRegistration:{
        type:String,
        required:true,
    },
    CompanySelfie:{
        type:String,
        required:true,
    },
    Verified:{
        type:Boolean,
        default:false,
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    }
})
export default mongoose.model('KybSchema',KybSchema)