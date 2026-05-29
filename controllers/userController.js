const User = require('../models/users');

exports.postUserDataToDataBase = async(req,res)=>{
  
   try {

    const {name,email,verifiedEmail} = req.body;

    const filter = {email};//Creating an Object named "filter" that has property email e.g filter = {email : email}

    const updatedDoc = {
        $set:{
            name,email,verifiedEmail
        }
    };

    const options = {upsert : true};

    const saveUsersData = await User.updateOne(filter,updatedDoc,options); 

    res.status(200).json(saveUsersData);
    
   } catch (error) {
    console.log(error);

    res.status(500).send({message : "Failed to save user"});
    
   }
};

//During FIRST registration/login: req.user may not exist yet because user creation happens BEFORE JWT verification 
//sometimes.That's why I removed tenantId:user.tenantId from here