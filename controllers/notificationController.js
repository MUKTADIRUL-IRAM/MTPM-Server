const Notification = require('../models/notification');

exports.getNotifications = async(req,res)=>{

    try {

        const user = req.dbUser;

        const findNotification = await Notification.find({receiverId:user._id}).sort({createdAt : -1});

        console.log("Notifications :",findNotification);

        res.status(200).json(findNotification);
        
    } catch (error) {

        res.status(500).json({message:'Failed to fetch notifications'});
    }

};