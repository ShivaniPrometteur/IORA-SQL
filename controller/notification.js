const { asyncFunc, throwError } = require("../lib/functions"),
    User = require("../models/User"),
    UserSession = require("../models/UserSession"),
    Notification = require("../models/Nottification"),
    Config = require('config');
    let FIREBASE_SERVER_KEY = Config.get("FIREBASE_SERVER_KEY")
    moment = require('moment-timezone');
    
/**
 * @route   GET api/notifications
 * @desc    Notification list
 * @access  Private
 * 
 */

User.hasOne(Notification);
// Notification.belongsTo(User);

exports.notification_list = asyncFunc(async (req, res, next) => {
    try{
    let user = req.body.user;
    if(!req.body.user){
        return res.status(400).send({msg:"please provide user id"})
    }
    let notifications = await Notification.findAll({where:{userId:user}}); 
    notifications = notifications.map((notiData,index)=>{
        notistatus = notiData.notistatus?notiData.notistatus:false;
        notiData = {
            "title": notiData.title,
            "message": notiData.message,
            "_id": notiData._id,
            "user": notiData.user,
            "notistatus": notistatus,
            "created_at":  moment.tz(notiData.created_at, "Asia/Kolkata").utc(true).toDate(),
            "updated_at":  moment.tz(notiData.updated_at, "Asia/Kolkata").utc(true).toDate()
        }
        return notiData     
    })
    res.status(200).json({
        status: 200,
        message: 'Notifications fetched successfully',
        data: notifications
    })
}catch (e) {
    res.status(400).send(e.message) 
}
});

/**
 * @route   POST api/update_notification/:noti_id
 * @desc    Update notification
 * @access  Private
 */
 exports.update_notification = asyncFunc(async (req, res, next) => {
    let noti_id = req.params.noti_id
    let bodydata = {           
        ...req.body,
        notistatus : req.body.notistatus == 'true'?true:false
    }
    const notification = await Notification.update( bodydata, {where:{id:noti_id}})
     try {
        
        res.status(201).send({
            status: 200,
            message: "Notification updated successfully.",
            data: notification
        })
     } catch (e) {
         res.status(400).send(e.message) 
     }
})

// exports.updateOrder = async (req, res) => {
//     try {
//       const noti_id = req.params.noti_id;
//       const notification = await Notification.findOne({ where: { id: noti_id } });
//       await notification.update(req.body).then((result) => {
//         res.status(200).send(result);
//       });
//     } catch (err) {
//       res.status(404).send(err);
//     }
//   };
