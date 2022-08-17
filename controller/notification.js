const { asyncFunc, throwError } = require("../lib/functions"),
    User = require("../models/User"),
    UserSession = require("../models/UserSession"),
    Notification = require("../models/Notification"),
    Config = require('config');
    let FIREBASE_SERVER_KEY = Config.get("FIREBASE_SERVER_KEY")
    moment = require('moment-timezone');
    
/**
 * @route   GET api/notifications
 * @desc    Notification list
 * @access  Private
 */
exports.notification_list = asyncFunc(async (req, res, next) => {
    let user = req.user();
    let notifications = await Notification.findAll({where:{user:user.id},order:['created_at','DESC']}); 
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
    const notification = await Notification.update( bodydata, {where:{noti_id}})
     try {
        let updated = await notification.save()
        res.status(201).send({
            status: 200,
            message: res.__("Notification updated successfully."),
            data: updated
        })
     } catch (e) {
         res.status(400).send(e) 
     }
})
