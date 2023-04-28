import mongoose from 'mongoose';

const NfcSchema = new mongoose.Schema({
    CreationType:{
        type:String,
        // required:true,
    },
    NFCImage:{
        type:String,
        // required:true,
    },
    Folder:{
        type:Boolean,
        default:false,
    },
    Title: {
        type: String,
        // required: true,
    },
    Type: {
        type: String,
        // required: true,
    },
    LimitedPieces:{
        type:Number,
    },
    Description: {
        type: String,
        // required: true,
    },
    CreationDate: {
        type: Date,
        // required: true,
    },
    PublicationDate: {
        type: Date,
        default:null,
    },
    Author:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author',
        // required:true,
    }],
    Owner:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owner',
        // required:true,
    }],
    Country:{
        type:String,
        // required:true,
    },
    Materials:{
        type:String,
    },
    PromoLink:{
        type:String,
        // required:true,
    },
    Categories:{
        type:String,
        // required:true,
    },
    Blockchain:{
        type:String,
        // required:true,
    },
    MarketPlace:{
        type:String,
        // required:true,
    },
    Royalties:{
        type:Number,
        // required:true,
    },
    WalletDestination:{
        type:String,
        // required:true,
    },
    Attribution:{
        type:String,
    },
 
    ReadingRules:{
        type:String,
        // required:true,
    },
    MetaRules:{
        type:String,
        // required:true,
    },
    GameRules:{
        type:String,
        // required:true,
    },
    PhysicalProduction:{
        type:String,
        // required:true,
    },
    QuantityRule:{
        type:String,
        // required:true,
    },
    SpecifyRules:{
        type:String,
    },
    QuantityProduced:{
        type:Number,
    },
    Planned:{
        type:String,
    },
    Exception:{
        type:String,
    },
    Comments:{
        type:String,
        // required:true,
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        // required:true,
    },
    NfcType:{
        type:String,
        default:"Draft"
    },
    Nfc_Verified:{
        type:Boolean,
        default:false,
    },
});
export default mongoose.model('NFC', NfcSchema);