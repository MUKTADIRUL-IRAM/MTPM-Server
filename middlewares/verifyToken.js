const jwt = require('jsonwebtoken');
const User = require('../models/users');

const verifyToken = (req,res,next)=>{

    const token = req.cookies?.trump;

    if(!token)
    {
       console.log('No token');
       return res.status(401).send({message : "Unauthorized Access"});
    }
   //JWT internally checks:Was this token signed using THIS secret key?
   //If:YES → decoded payload returned,NO → error
   
   jwt.verify(token,process.env.JWT_ACCESS_TOKEN,async(err,decoded)=>{
     
     if(err)
     {
        console.log("Not the correct token : ",err);
        return res.status(401).send({message : "Unauthorized Access"});
     }

     console.log("Token verified successfully : ",decoded);

     req.user = decoded;

     const user = await User.findOne({email : req.user.email}); //Use '.select()' to fetch limited data => const user = await User.findOne({email:req.user.email}).select('_id email tenantId');

     if(!user)
     {
       return res.status(404).send({message : " User not found "});
     }

     req.dbUser = user;

     next();
     
      
   });

};

module.exports = verifyToken;

//decoded = It is the payload you stored while creating token;
//So your payload = {email};thus decoded = {email}
//  decoded = {
//   email: "user@email.com",
//   iat: ...,
//   exp: ...
// }