const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{

    const token = req.cookies?.trump;

    if(!token)
    {
       console.log('No token');
       return res.status(401).send({message : "Unauthorized Access"});
    }
   //JWT internally checks:Was this token signed using THIS secret key?
   //If:YES → decoded payload returned,NO → error
   
   jwt.verify(token,process.env.JWT_ACCESS_TOKEN,(err,decoded)=>{
     
     if(err)
     {
        console.log("Not the correct token : ",err);
        res.status(401).send({message : "Unauthorized Access"});
     }

     console.log("Token verified successfully : ",decoded);

     req.user = decoded;

     next();
     
      
   })

};

module.exports = verifyToken;

//decoded = It is the payload you stored while creating token;
//So your payload = {email};thus decoded = {email}
//  decoded = {
//   email: "user@email.com",
//   iat: ...,
//   exp: ...
// }