//Model handles database + schema + logic

const mongoose = require('mongoose');

//Blueprint
const projectSchema = new mongoose.Schema({
      
      project_Name:{
        type:String,
        required:true
      },
      // userEmail:{
      //   type:String,
      //   required:true
      // },
      // tenantId:{
      //   type:mongoose.Schema.Types.ObjectId,
      //   ref:"WorkSpace", //references your WorkSpace Collection
      //   required:true
      // },
      ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      },
      workSpaceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WorkSpace", //references your WorkSpace Collection
        required:true
      }

});

module.exports = mongoose.model('PROJECT',projectSchema);//Creates a Model (class)

//Model name -> Singular + PascalCase
//Collection name -> Auto Plural