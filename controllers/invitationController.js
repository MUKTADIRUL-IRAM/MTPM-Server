const Invitation = require('../models/invitation');
const User = require('../models/users');
const WorkSpace = require('../models/workSpace');
const Notification = require('../models/notification');

exports.saveInvitationDataToDatabase = async(req,res)=>{

  try {

    const owner = req.dbUser;

    const {workSpaceId,email,role} = req.body;

    const invitedUser = await User.findOne({email});

    if(!invitedUser)
    {
        return res.status(404).send({message : "User not found"});
    }

    const workSpace = await WorkSpace.findById(workSpaceId);

    if(!workSpaceId)
    {
        return res.status(404).send({message : "WorkSpace not found"});
    }

    if(workSpace.ownerId.toString() !== owner._id.toString())
    {
        return res.status(403).send({message : "Only owner can invite members"});
    }

    const existingInvitation = await Invitation.findOne({workSpaceId,invitedUser:invitedUser._id,status:"pending"});

    if(existingInvitation)
    {
        return res.status(409).send({message : "Invitation already exists"});
    }

    const saveInvitationData = await Invitation.create({workSpaceId,role,invitedBy:owner._id,invitedUser:invitedUser._id});

    const saveNotificationToDataBase = await Notification.create({
      senderId : owner._id,
      receiverId : invitedUser._id,
      invitationId : saveInvitationData._id,
      workSpaceId,
      isRead : false,
      type : "workspace_invite",
      message : `${owner.name} invited you to ${workSpace.workSpaceName}`
      
    });

    console.log("Notification Created : ",saveNotificationToDataBase);
    
    res.status(201).json({message : "Invitation sent successfully",saveInvitationData});


    
  } catch (error) {

    console.log(error);

    res.status(500).json({error:error.message});
    
  }

};

// exports.getInvitation = async(req,res)=>{

//   try {

//     const user = req.dbUser;

//     const invitation = await Invitation.find({
//       invitedUser:user._id,
//       status:"pending"
//     }).populate('workSpaceId');

//     res.status(200).json(invitation);

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({error:error.message});
    
//   }

// };

exports.acceptInvitation = async(req,res)=>{

  try {

  const invitation = await Invitation.findById(req.params.invitationId);

  if(!invitation)
  {
    return res.status(404).send({message:"Invitation not found"});
  }

  if(invitation.invitedUser.toString() !== req.dbUser._id.toString())
  {
     return res.status(403).send({message:"Unauthorized"});
  }
  

  invitation.status = "accepted";

  await invitation.save();

  await WorkSpace.findByIdAndUpdate(

        invitation.workSpaceId,

        {
          $push:{
            members:{
              userId:invitation.invitedUser,
              role:invitation.role

            }
          }
        }   
      
      )
    await Notification.findOneAndUpdate(
      {
        invitationId:req.params.invitationId
      },
      {
        $set:{

          isRead:true
        }
      }
    );

      res.status(200).json({message:"Invitation Accepted"});
    
  } catch (error) {

    console.log(error);

    res.status(500).json({error:error.message}); 
  }



};

exports.rejectInvitation = async(req,res)=>{

  try {

  const invitation = await Invitation.findById(req.params.invitationId);

  if(!invitation)
  {
    return res.status(404).send({message:"Invitation not found"});
  }

  invitation.status = "rejected";

  await invitation.save();

  await Notification.findOneAndUpdate(
      {
        invitationId:req.params.invitationId
      },
      {
        $set:{

          isRead:true
        }
      }
    );

  res.status(200).json({message:"Invitation Rejected"});

  } catch (error) {

    console.log(error);

    res.status(500).json({error:error.message}); 
    
  }

};