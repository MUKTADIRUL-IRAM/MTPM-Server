const mongoose = require('mongoose');
// It is for "To Do"
const taskSchema = new mongoose.Schema({

    task:{
        type:String,
        required:true
      },
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
      },
    status:{
        type:String,
        required:true
    },
    // userEmail:{
    //   type:String,
    //   required:true
    // },
    ownerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
  //   tenantId:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:"WorkSpace",
  //     required:true
  //  },
    assignedTo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    workSpaceId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"WorkSpace", //references your WorkSpace Collection
      required:true
    }

});

module.exports = mongoose.model('Task',taskSchema);
////Frontend --> Controller --> Mongoose Schema
//Schema must match what you SEND to Mongoose (in controller)

//We have tp write variable name in schema accordingly to controller e.g(project_id,task) in "await Task.create({project_id,task})"

