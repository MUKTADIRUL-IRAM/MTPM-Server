const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({

    workSpaceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WorkSpace",
        required:true
    },

    invitedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    invitedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    role:{
        type:String,
        enum:["admin","member"],
        default:"member"
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }

},{timestamps : true});

module.exports = mongoose.model("Invitation",invitationSchema);