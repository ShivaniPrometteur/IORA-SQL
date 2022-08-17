const { asyncFunc, throwError } = require("../lib/functions"),
    User = require("../models/User"),
    WeightData = require("../models/WeightData"),
    Mailer = require('../lib/mailer'),
    Order = require("../models/Order"),
    {sendMessageToUser} = require("./instrument"),
    handlebars = require("handlebars"),
    fs = require("fs"),
    Notification = require("../models/Notification");
    Group = require("../models/Group");
    path = require("path");



exports.addorder = asyncFunc(async (req, res, next) => {
    let userdata = req.user();

    
    let bodydata = {           
        ...req.body,
        user: userdata._id
    }
    if(bodydata.order_type == 'rent')
    {
        let today = new Date();
        today.setFullYear(today.getFullYear() + 1);
        bodydata.expire_date = today
    }
    let order = new Order(bodydata)
     try {
            await order.save()
            // send mail to delivery address email
            
         const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../templates/order-purchase-successfully.hbs"), "utf8");
         const template = handlebars.compile(emailTemplateSource)
         const htmlToSend = template({...req.body})

         const emailImages = [{
            filename: 'facebook.png',
            path: path.join(__dirname, '../public/images/facebook.png'),
            cid: 'facebook'
    },{
            filename: 'favicon.png',
            path: path.join(__dirname, '../public/images/favicon.png'),
            cid: 'favicon'
    },{
            filename: 'instagram.png',
            path: path.join(__dirname, '../public/images/instagram.png'),
            cid: 'instagram'
    },{
            filename: 'linkedin.png',
            path: path.join(__dirname, '../public/images/linkedin.png'),
            cid: 'linkedin'
    },{
            filename: 'logo.png',
            path: path.join(__dirname, '../public/images/logo.png'),
            cid: 'logo'
    },{
            filename: 'twitter.png',
            path: path.join(__dirname, '../public/images/twitter.png'),
            cid: 'twitter'
    }]

            Mailer.sendMail({
                to: req.body.d_email, // list of receivers
                subject: "Purchase successful", // Subject line
                html: htmlToSend, // html body
                attachments: emailImages,
              },(error,response) =>{
                //   console.log(error,response)
              })
            res.status(201).send({
                status: 200,
                message: res.__("Ordered successfully"),
                data: order
            })
     } catch (e) {
         res.status(400).send(e) 
     }
});


exports.order_list = asyncFunc(async (req, res, next) => {
    let userdata = req.user();
    
    try{
        let filter = {user:userdata._id}
        if(req.body.isDelievered == "true"){
            filter.delivery_date = {$ne : null}
        }
        let orders = await Order.findAll({where:{filter},order: [['created_at', 'DESC']]});
        res.status(200).json({
            status: 200,
            message: 'Orders fetched successfully',
            data: orders
        })
    }catch (e) {
         res.status(400).send(e) 
     }
 });

 
 exports.admin_order_list = asyncFunc(async (req, res, next) => {
    try{
        let orders = await Order.findAll({order:['created_at','DESC']});
        res.status(200).json({
            status: 200,
            message: 'Orders fetched successfully',
            data: orders
        })
    }catch (e) {
         res.status(400).send(e) 
     }
 });


 exports.update_order = asyncFunc(async (req, res, next) => {
    try{
        let orderId = req.params.order_id;
        if(req.body.deviceStatus == "true"){
            req.body.deviceStatus = true;
        }else{
            req.body.deviceStatus = false;
        }
        // check if order with device id already exist
        let deviceExist = false
        if(req.body.device_id == ""){
            console.log('device id:'+req.body.device_id)
            return res.json({
                status: 200,
                message: res.__("Device Id Cannot be empty")
            });
        }
        if(req.body.device_id && (req.body.device_id != "" || req.body.device_id != null) ){
            let deviceExistcheck = await Order.count({where:{device_id:req.body.device_id,id: { [Op.ne]: orderId }}});
            if (deviceExistcheck > 0 ) {
                deviceExist = true
            }
        }

        if(deviceExist == true){
            return res.json({
                status: 200,
                message: res.__("Device Id Already Added")
            });
        }
        let order = await Order.update({...req.body} , {where:{orderId} });
        return res.json({
            status: 200,
            message: res.__("Order updated successfully"),
            data:order
        });
    }catch (e) {
         res.status(400).send(e) 
     }
 });


 exports.orderDataBYDeviceID = asyncFunc(async (req, res, next) => {
    try{
        let device_id = req.params.device_id;
        let order = await Order.findOne({where:{device_id},attributes:['order_type', 'expire_date', 'containerWeight', 'weightPerItem', 'weight_threshold', 'battery_threshold', 'name', 'order_capacity', 'description', 'device_id', 'deviceStatus', 'id']});
        // get current weight and battery
        let currentApiData = await WeightData.findOne({where:{device_id},order: [['created_at', 'DESC']]});
        wtData = currentApiData.api_data.data
        let lastTenData = '';
         if(req.body.start_date != '' && req.body.end_date != '' && req.body.type == 'day'){
             lastTenData = await WeightData
             .aggregate(
                 [{ match: { [Op.and]: [{created_at: {[Op.gte]: new Date(`${req.body.start_date}T00:00:00.000Z`),
                 [Op.lt]: new Date(`${req.body.end_date}T00:00:00.000Z`)}},{device_id}] } },
                 {
                     $project: {
                         api_data : 1,
                         device_id : 1,
                         created_at : 1,
                         updated_at : 1,
                         _id : 1
 
                     }
                 },
                 {
                     
                     group: {
                         _id : { year:{"$year":"$created_at"},month:{"$month":"$created_at"},day:{"$dayOfMonth":"$created_at"},hour:{"$hour":"$created_at"}},
                         doc:{"$first":"$$ROOT"}
                     }
                 },
                 {$replaceRoot:{"newRoot":"$doc"}}
                 
             ],{order:['created_at','ASC']}).exec()
         }
         else if(req.body.start_date != '' && req.body.end_date != '' && req.body.type == 'week'){
             lastTenData = await WeightData
             .aggregate(
                 [{ match: { [Op.and]: [{created_at: {[Op.gte]: new Date(`${req.body.start_date}T00:00:00.000Z`),
                 [Op.lt]: new Date(`${req.body.end_date}T00:00:00.000Z`)}},{device_id}] } },
                 {
                     $project: {
                         api_data : 1,
                         device_id : 1,
                         created_at : 1,
                         updated_at : 1,
                         _id : 1
 
                     }
                 },
                 {
                     
                     group: {
                         _id : { week:{"$week":"$created_at"}},
                         doc:{"$first":"$$ROOT"}
                     }
                 },
                 {$replaceRoot:{"newRoot":"$doc"}}
                 
             ],{order:['created_at','ASC']}).exec()
         }
         else if(req.body.start_date != '' && req.body.end_date != '' && req.body.type == 'month'){
             lastTenData = await WeightData
             .aggregate(
                 [{ match: { [Op.and]: [{created_at: {[Op.gte]: new Date(`${req.body.start_date}T00:00:00.000Z`),
                 [Op.lt]: new Date(`${req.body.end_date}T00:00:00.000Z`)}},{device_id}] } },
                 {
                     $project: {
                         api_data : 1,
                         device_id : 1,
                         created_at : 1,
                         updated_at : 1,
                         _id : 1
 
                     }
                 },
                 {
                     
                     group: {
                         _id : { year:{"$year":"$created_at"},month:{"$month":"$created_at"},day:{"$dayOfMonth":"$created_at"}},
                         doc:{"$first":"$$ROOT"}
                     }
                 },
                 {$replaceRoot:{"newRoot":"$doc"}}
                 
             ],{order:['created_at','ASC']}).exec()
         }
         else if(req.body.start_date != '' && req.body.end_date != '' && req.body.type == 'year'){
             lastTenData = await WeightData
             .aggregate(
                 [{ match: { [Op.and]: [{created_at: {[Op.gte]: new Date(`${req.body.start_date}T00:00:00.000Z`),
                 [Op.lt]: new Date(`${req.body.end_date}T00:00:00.000Z`)}},{device_id}] } },
                 {
                     $project: {
                         api_data : 1,
                         device_id : 1,
                         created_at : 1,
                         updated_at : 1,
                         _id : 1
 
                     }
                 },
                 {
                     
                     group: {
                         _id : { year:{"$year":"$created_at"},month:{"$month":"$created_at"}},
                         doc:{"$first":"$$ROOT"}
                     }
                 },
                 {$replaceRoot:{"newRoot":"$doc"}}
                 
             ],{order:['created_at','ASC']}).exec()
         }
         else 
         {
             lastTenData = await WeightData.findOne({where:{device_id},order:['created_at','DESC'],limit:10});
         }
      
         lastTenData.filter((entry) => {
            if(entry.api_data.data.timeStamp != ""){
                return entry;
            }
        })
         return res.json({
             status: 200,
             message: res.__("Device Details fetched successfully"),
             data:{order,wtData,lastTenData}
         }); 
    }catch (e) {
         res.status(400).send(e) 
     }
 });


 exports.orderById = asyncFunc(async (req, res, next) => {
    try{
        let order_id = req.params.order_id;
        let order = await Order.findOne({where:{order_id},attributes:['delivery_date', 'device_id']});
         return res.json({
             status: 200,
             message: res.__("Order Details fetched successfully"),
             data:{order}
         }); 
    }catch (e) {
         res.status(400).send(e) 
     }
 });


 exports.deviceNotSendingData = asyncFunc(async (req, res, next) => { 
    try{      
        const filter = {
            device_id: { $ne: null },
            deviceStatus:true
        }
       let devices = await Order.findAll({where:{filter},attributes:['device_id', 'timeDifference', 'user_id']});
        var start = new Date();
        start.setHours(0,0,0,0);

        var end = new Date();
        end.setHours(23,59,59,999);
        let currentTime = new Date();
        devices.map( async (deviceData)=>{
            // get last entry from weightdata from device
            let timeDifference = 3*(deviceData.timeDifference);
            let lastWeightData = await WeightData.findOne({where:{device_id:deviceData.device_id,created_at: {[Op.gte]: start, [Op.lt]: end}},attributes:['created_at','id'],order:{order: [['created_at', 'DESC']]}});
            if(lastWeightData){
                // get difference between current time and last entry
                let lastTime = lastWeightData.created_at;
                let differenceTime =(currentTime.getTime() - lastTime.getTime())/ 1000;
                // if last entry time  is 3 times greater than expected time, means device is not connected to wifi, last 3 entries not added in expected time
                   if( differenceTime > timeDifference ) {
                    // save notification
                    let title = "Device Inactive"
                    let message = `Your device did not send data since last ${secondsToHms(differenceTime)}. Please check your connection.`;
                    let bodydata = {           
                        title,message,user:deviceData.user
                    }
                    const notification = new Notification(bodydata);
                    await notification.save();
                    // send notification in firebase
                    let userData = await User.findOne({where:{id:deviceData.user},attributes:['fcm_key']}); 
                    await sendMessageToUser(userData.fcm_key, bodydata);
                    // console.log(bodydata)
                }    
            }
        })
        // res.status(200).json({
        //         status: 200,
        //         message: ` Notifications sent successfully`,
        //         devices:devices
        //     })
    } catch (e) {
        console.log(e)
        // res.status(500).send()
    }    
  });


  exports.scalesInHome = asyncFunc(async (req, res, next) => {
    let userdata = req.user();
    try{
        // get scales purchased by you
        let orders = await Order.find({where:{user:userdata._id, delivery_date: { [Op.ne]: null }},order:['created_at','DESC']});  //order: [['created_at', 'DESC']]
        // get scales assigned to you
        let assignedGroups = await Group.findAll({invites: { $regex: '.*' + userdata.mobile + '.*' } }).select('scales -_id').sort({ created_at: -1 });
        let allOrderIds = []
        assignedGroups.forEach((grp)=>{
            grp.scales.forEach((orderId)=>{
                allOrderIds.push(orderId)
            })
        })
        let assignedOrders = await Order.findAll({ where:{id: { [Op.in]: allOrderIds } , delivery_date: { [Op.ne]: null }},order:['created_at','DESC']});

        res.status(200).json({
            status: 200,
            message: 'Scales fetched successfully',
            data: [...orders,...assignedOrders]
        })
    }catch (e) {
         res.status(400).send(e) 
     }
});

