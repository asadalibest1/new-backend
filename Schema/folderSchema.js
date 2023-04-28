import mongoose from 'mongoose';

const FolderSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    FolderType:{
        type:String,
        default:"Mint"
    },
    Nfc:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'NFC',
    }],
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})
export default mongoose.model('Folder', FolderSchema)