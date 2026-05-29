const mongoose = require('mongoose');

const notificatonSchema = new mongoose.Schema({

    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    workSpaceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WorkSpace",
    },

    message:{
        type:String,
        required:true
    },

    isRead:{
        type:Boolean,
        default:false
    },

    type:{
        type:String,
        enum:[
            'workspace_invite',
            'task_assigned',
            'project_added',
            'comment',
        ]
    },
    invitationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Invitation'
    }


},{timestamps:true});

module.exports = mongoose.model("Notification",notificatonSchema);