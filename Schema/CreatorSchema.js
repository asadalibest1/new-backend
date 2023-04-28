import mongoose from 'mongoose';

const CreatorSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        require:true,
    },
    LastName:{
        type:String,
        require:true,
    },
    ArtistNick:{
        type:String,
        require:true,
    },
    CreativeInvolvement:{
        type:String,
        require:true,
    },
    Plan:{
        type:String,
        require:true,
    },
    Bio:{
        type:String,
        require:true,
    },
})
export default mongoose.model('Creator', CreatorSchema)