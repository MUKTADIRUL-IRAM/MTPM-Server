const WorkSpace = require('../models/workSpace');
const User = require('../models/users');

exports.saveWorkSpaceToDataBase = async(req,res)=>{

    try {
        const {workSpaceName} = req.body;

        const user = req.dbUser;

        // const user = await User.findOne({email : req.user.email});

        if(!user)
        {
            return res.status(404).send({message:"User not found"});
        }

        const existingWorkSpace = await WorkSpace.findOne({
            workSpaceName : workSpaceName.trim(),
            ownerId:user._id
        });

        if(existingWorkSpace)
        {
            return res.status(409).send({message:"You already have a workspace with the same name"});
        }
        
        const saveWorkSpace = await WorkSpace.create({workSpaceName : workSpaceName.trim(),
                                                      ownerId:user._id,
                                                      members:[{userId:user._id,role:'owner'}]
        });

        // await User.updateOne({_id : user._id},
        //                      {
        //                         $set:{
        //                             tenantId : saveWorkSpace._id
        //                         }
        //                      }
        // );


        res.status(201).send(saveWorkSpace);

    } catch (error) {
        console.log("FULL ERROR from saveWorkSpaceToDataBase of workSpace Controller  : ", error); // important
        res.status(500).json({error : error.message});
    }
    

};

exports.getWorkSpaceList = async(req,res)=>{
       
    try {
    
    const user = req.dbUser;
    // const user = await User.findOne({email : req.user.email});

    console.log("User is : ",user);
    
    const findAllWorkSpaces = await WorkSpace.find({"members.userId" : user._id});

    res.status(200).json(findAllWorkSpaces);
        
    } catch (error) {
        res.status(500).json({error : error.message});
    }

};

exports.getSingleWorkSpace = async(req,res)=>{
  
    try {

    const getOneWorkSpace = await WorkSpace.findOne({_id : req.params.workSpaceId});

    if(!getOneWorkSpace)
    {
        return res.status(404).send({message : "WorkSpace not found "});
    }

    res.status(200).json(getOneWorkSpace);
        
    } catch (error) {
          res.status(500).json({error : error.message});
    }




};