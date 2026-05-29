const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
      
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",// references your User collection
        required:true
    },
    role:{
        type:String,
        enum:['owner','admin','member'],// restricts to valid roles only
        default:'member',
        required:true
    }

},{_id:false});// prevents Mongoose from adding an extra _id to each member object

const workSpaceSchema = new mongoose.Schema({

    workSpaceName:{
        type:String,
        required:true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",// references your User collection
        required:true
    },
    members:[memberSchema]
    

},{timestamps:true});// auto-manages createdAt and updatedAt for you

module.exports = mongoose.model('WorkSpace',workSpaceSchema);