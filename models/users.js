const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique : true
    },
    verifiedEmail:{
        type:String,
        required:true
    },
    // tenantId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"WorkSpace" //references your WorkSpace Collection 
    // }

});

module.exports = mongoose.model('User',userSchema);