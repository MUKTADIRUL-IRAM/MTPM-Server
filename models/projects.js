//Model handles database + schema + logic

const mongoose = require('mongoose');

//Blueprint
const projectSchema = new mongoose.Schema({
      
      project_Name:{
        type:String,
        required:true
      },
      userEmail:{
        type:String,
        required:true
      }
      

});

module.exports = mongoose.model('PROJECT',projectSchema);//Creates a Model (class)

//Model name -> Singular + PascalCase
//Collection name -> Auto Plural