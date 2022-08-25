const { asyncFunc, throwError } = require("../lib/functions"),
    User = require("../models/User"),
    WeightData = require("../models/WeightData"),
    Mailer = require('../lib/mailer'),
    Order = require("../models/orrder"),
    Ord=require("../models/orrder")
    Scale = require("../models/scale"),
    {sendMessageToUser} = require("./instrument"),
    handlebars = require("handlebars"),
    fs = require("fs"),
    Notification = require("../models/Notification");
    const Group = require("../models/group");
    path = require("path");
    const { Op } = require("sequelize");
    


    Scale.hasOne(Ord);
   
    User.hasOne(Ord);
    
   
  

   // exports.addorder = asyncFunc(async (req, res, next) => {
//    // let userdata = req.user();

    
//     let bodydata = {           
//         ...req.body
//        // user: userdata.id
//     }
//     if(bodydata.order_type == 'rent')
//     {
//         let today = new Date();
//         today.setFullYear(today.getFullYear() + 1);
//         bodydata.expire_date = today
//     }
//     let order = new Order(bodydata)
//      try {
//             await order.save()
//             // send mail to delivery address email
            
//          const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../templates/order-purchase-successfully.hbs"), "utf8");
//          const template = handlebars.compile(emailTemplateSource)
//          const htmlToSend = template({...req.body})

//          const emailImages = [{
//             filename: 'facebook.png',
//             path: path.join(__dirname, '../public/images/facebook.png'),
//             cid: 'facebook'
//     },{
//             filename: 'favicon.png',
//             path: path.join(__dirname, '../public/images/favicon.png'),
//             cid: 'favicon'
//     },{
//             filename: 'instagram.png',
//             path: path.join(__dirname, '../public/images/instagram.png'),
//             cid: 'instagram'
//     },{
//             filename: 'linkedin.png',
//             path: path.join(__dirname, '../public/images/linkedin.png'),
//             cid: 'linkedin'
//     },{
//             filename: 'logo.png',
//             path: path.join(__dirname, '../public/images/logo.png'),
//             cid: 'logo'
//     },{
//             filename: 'twitter.png',
//             path: path.join(__dirname, '../public/images/twitter.png'),
//             cid: 'twitter'
//     }]

//             Mailer.sendMail({
//                 to: req.body.d_email, // list of receivers
//                 subject: "Purchase successful", // Subject line
//                 html: htmlToSend, // html body
//                 attachments: emailImages,
//               },(error,response) =>{
//                 //   console.log(error,response)
//               })
//             res.status(201).send({
//                 status: 200,
//                 message: res.__("Ordered successfully"),
//                 data: order
//             })
//      } catch (e) {
//          res.status(400).send(e) 
//      }
// });


exports.addorder = async (req, res) => {
    try {
      
      const order = await Order.create(req.body);
      if(req.body.order_type == 'rent')
    {
        let today = new Date();
        today.setFullYear(today.getFullYear() + 1);
        bodydata.expire_date = today
    }
      res.status(200).send(order);
    } catch (err) {
      res.status(404).send(err);
    }
  };



// exports.order_list = asyncFunc(async (req, res, next) => {
//     let userdata = req.body;
    
//     try{
//         let filter = {user:userdata.id}
//         // if(req.body.isDelievered == "true"){
//         //     filter.delivery_date = {$ne : null}
//         // }
//         let orders = await Order.findAll({where:{filter},order: [['created_at', 'DESC']]});
//         res.status(200).json({
//             status: 200,
//             message: 'Orders fetched successfully',
//             data: orders
//         })
//     }catch (e) {
//          res.status(400).send(e) 
//      }
//  });


exports.order_list = async (req, res) => {
    try {
      const search = { userId: req.body.userid };
      await Order.findAll({ where: search })
        .then((orders) => {
          res.status(200).send(orders);
        })
        .catch((e) => {
          res.status(404).send(e);
        });
    } catch (e) {
      res.status(400).send(e);
    }
  };

 
 exports.admin_order_list = asyncFunc(async (req, res, next) => {
    try{
        let orders = await Order.findAll({});
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
                message: "Device Id Cannot be empty"
            });
        }
        // if(req.body.device_id && (req.body.device_id != "" || req.body.device_id != null) ){
        //     let deviceExistcheck = await Order.findOne({where:{device_id:req.body.device_id,id: { [Op.ne]: orderId }}});
        //     if (deviceExistcheck.length > 0 ) {
        //         deviceExist = true
        //     }
        // }

        // if(deviceExist == true){
        //     return res.json({
        //         status: 200,
        //         message: "Device Id Already Added"
        //     });
        // }
        //let order = await Order.update( {where:{id:orderId} },{...req.body} );
        const order = await Order.findOne({ where: { id: orderId } });
      await order.update(req.body).then((result) => {
        res.status(200).send(result);
      });
        // return res.json({
        //     status: 200,
        //     message: "Order updated successfully",
        //     data:order
        // });
    }catch (e) {
         res.status(400).send(e.message) 
     }
 });


 exports.orderDataBYDeviceID = asyncFunc(async (req, res, next) => {
    try{
        let order = await Order.findOne({where:{device_id:req.params.device_id}});
        // get current weight and battery
        let currentApiData = await WeightData.findOne({where:{device_id},[Op.gt]:created_at});
        wtData = currentApiData.api_data.data
        
         
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
        let order = await Order.findOne({where:{id:order_id},attributes:['delivery_date', 'device_id']});
        if(!order){
            return res.status(404).send({msg:"order not found"})
        }
         return res.json({
             status: 200,
             message: "Order Details fetched successfully",
             data:{order}
         }); 
    }catch (e) {
         res.status(400).send(e.message) 
     }
 });


 exports.deviceNotSendingData = asyncFunc(async (req, res, next) => { 
    try{      
        // const filter = {
        //     device_id: {
        //         [Op.ne]: null 
        //       },
        //     //device_id: { $ne: null },
        //     deviceStatus:true
        // }
       let devices = await Order.findAll({where:{device_id: {[Op.ne]: null},deviceStatus:true}});    //,attributes:['device_id', 'timeDifference', 'userId']
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
        console.log(e.message)
        // res.status(500).send()
    }    
  });


  exports.scalesInHome = asyncFunc(async (req, res, next) => {
    //let userdata = req.user();
    try{
        // get scales purchased by you
        let orders = await Order.findOne({where:{userId:req.query.user_id, delivery_date: { [Op.ne]: null }}});  //order: [['created_at', 'DESC']]
        // get scales assigned to you        [op.in]:invites:{[Op.like]:userdata.mobile} 
        let assignedGroups = await Group.findAll({where:{invites: {[Op.like]: req.body.mobile }}} ,{attributes:['scales','id']});
        let allOrderIds = []
        assignedGroups.forEach((grp)=>{
            grp.scales.forEach((orderId)=>{
                allOrderIds.push(orderId)
            })
        })
        let assignedOrders = await Order.findAll({ where:{id: { [Op.in]: allOrderIds } , delivery_date: { [Op.ne]: null }}});

        res.status(200).json({
            status: 200,
            message: 'Scales fetched successfully',
            data:orders ,
            assignedorders:assignedOrders     // [...orders,...assignedOrders]
        })
    }catch (e) {
         res.status(400).send(e.message) 
     }
});

