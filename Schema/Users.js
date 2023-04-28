import mongoose from 'mongoose';

const schema = new mongoose.Schema({

    address: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    gmail_id: {
        type: String,
        default: "",
    },
    p_type: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    artName: {
        type: String,
        default: "",
    },
    creativeInvolvement: {
        type: Number,
    },
    plan: {
        type: String,
        default: "",
    },
    kyc: {
        type: Boolean,
        default: false,
    }, 
    address: {
        type: String,
        default: "",
    },
    otp: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    files: [String],
    subscription:{
        type:Boolean,
        default:false,
    },
    Plan:{
        type:String,
    },
    subscriptionId:{
        type:String,
    },
    UserVerified:{
        type:Boolean,
        default:false,
    },
    Plan:{
        type:String,
    },
    NFC_Count:{
        type:String,
    }
}, { timestamps: true })

export default mongoose.model('users', schema)