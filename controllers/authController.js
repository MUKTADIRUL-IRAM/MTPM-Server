//Controller handles request logic

/* Class → Blueprint
Object → Real thing created from blueprint */

//const User = require('../models/register');
//User --> Mongoose Model(class/constructor function)
//newUser --> actual data object(document)

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const isProduction = process.env.NODE_ENV === "production";

exports.jsonWebToken = async(req,res)=>{
  
    try {
        const {email} = req.body;
        //Generating token
        const token = jwt.sign({email},process.env.JWT_ACCESS_TOKEN,{expiresIn:"1h"})//jwt.sign(payload,secretKey,{expiresIn:""})
                                                                                     //payload should be in object from 
                                                                                     // that's why {email} instead of email
        //[Cookie Stored in browser]Generating cookie[Token stored in cookie]
        //"trump" is the name of the cookie
        res.cookie("trump",token,{
            httpOnly:true,
            secure:isProduction,//process.env.NODE_ENV === "production" true only for HTTPS ; 
                                //Locally, NODE_ENV=development → secure:false,
                                //sameSite:lax ;
                                //On Vercel, NODE_ENV=production → secure:true, sameSite:none
            sameSite:isProduction ? "none" : "lax",//process.env.NODE_ENV === "production" ? "none" : "lax"
                                                  // none for cross-site (prod), lax for local
            path:'/'//cookie visible to all routes
        });

        res.send({token});

    } catch (error) {

        console.log("FULL ERROR from JsonWebToken : ", error); // important
        res.status(500).json({error : error.message});
    }
};

exports.clearingCookie = async(req,res)=>{

    res.clearCookie("trump",{
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "lax",
        path:'/'
    });

    res.send({message:"Cookie cleared.Logged out successfully"});

};