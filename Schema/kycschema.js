import mongoose from 'mongoose';

const KycSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    MobileNumber:{
        type:Number,
        required:true,
    },
    Contact:{
        type:String,
        required:true,
    },
    GovernmentDocuments:{
        type:String,
        required:true,
    },
    UploadSelfie:{
        type:String,
        required:true,
    },
    CertificateRights:{
        type:Boolean,
        required:true,
    },
    examplesWork:{
        type:Boolean,
        required:true,
    },
    UploadExamples:{
        type:Boolean,
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
export default mongoose.model('KycSchema',KycSchema)