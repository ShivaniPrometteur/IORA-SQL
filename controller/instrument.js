const { asyncFunc, throwError } = require("../lib/functions"),
    WeightData = require("../models/WeightData");
    Order = require("../models/Order");
    User = require("../models/User");
    Notification = require("../models/Notification");
    Config = require('config');
    var request = require('postman-request')
    let FIREBASE_SERVER_KEY = Config.get("FIREBASE_SERVER_KEY")

/**
 * @route   POST weightData/
 * @desc    ADD weightData
 * @access  Private
**/

exports.weightData = asyncFunc(async (req, res, next) => {
    let inputdata = {
        api_data : {...req.body},
        device_id : req.body.devID
    } 
    try{
      if(req.body.data.timeStamp == ""){
        return  res.status(500).send('TimeStamp cannot be empty');
      }
        const weighdata = new WeightData(inputdata);
        const weigh = await weighdata.save();
        let currentBattery = req.body.data.currBt;
        let currentWeight = req.body.data.currWt;
        let orderData = await Order.findOne({where:{device_id:inputdata.device_id}})
        let title = '';
        let message = '';
        let count = 0;
        if(orderData){
            if(currentWeight > 0){
                if(orderData.weight_threshold > currentWeight ){
                    // if weight is less than threshold send notification
                    title = 'Less than threshold weight.';
                    message = `Current weight ${currentWeight}  is less than threshold weight ${orderData.weight_threshold}.`;
                    count++;
                }
                if(currentWeight > orderData.order_capacity){
                    // if weight is greater than capacity send notification
                    title = 'Weight greater than capapcity.';
                    message =   `Current weight ${currentWeight} is greater than the capacity ${orderData.order_capacity}.`;
                    count++;
                }
            }
        
        
            if(orderData.battery_threshold > currentBattery){
                // if battery is less than threshold send notification
            title = 'Less than threshold battery.';
            message = `Current battery ${currentBattery} is less than threshold battery ${orderData.battery_threshold}.`;
            count++;
            }
        }
        if(count > 0){
          // check if last notification is same and what is the status,
          let bodydata = {           
              title,message,user:orderData.user
          }
          let lastnotification = await Notification.findOne({...bodydata},{order:['created_at','DESC'],attributes:['created_at notistatus']});
          let currentTime = new Date();
          if(lastnotification){
            let lastTime = lastnotification.created_at;
            let differenceTime =(currentTime.getTime() - lastTime.getTime())/ 1000;
            // check time is greater than 30 min
            let devicetimeDifference = orderData.timeDifference?orderData.timeDifference:0
            if((differenceTime > devicetimeDifference) && (lastnotification.notistatus == false)) {
              // if same and false send notification 
              const notification = new Notification(bodydata);
              await notification.save();
              let tofind=orderData.user;
              let userData = await User.findOne({where:{tofind},attributes:['fcm_key']}); 
              await sendMessageToUser(userData.fcm_key, bodydata);
			  await sendNotificationToAssignedusers(orderData._id,bodydata)
            }
          }else{
              const notification = new Notification(bodydata);
              await notification.save();
              let userData = await User.findOne({where:{tofind},attributes:['fcm_key']}); 
              await sendMessageToUser(userData.fcm_key, bodydata);
              await sendNotificationToAssignedusers(orderData._id,bodydata)
          }
        }        
        res.status(200).json({
            status: 200,
            message: 'Data added successfully',
            data: weigh
        });
    } catch (e) {
        res.status(500).send(e);
    }    
});
/**
 * @route   GET allweightData
 * @desc    get all weight data from device
 * @access  Public
 */
exports.allweightData = asyncFunc(async (req, res, next) => { 
    try{      
        const weigh = await WeightData.findAll({order:['created_at','DESC'],attributes:['device_id'],limit:50});
        res.status(200).json({
            status: 200,
            message: 'Data added successfully',
            data: weigh
        })
    } catch (e) {
        res.status(500).send()
    }    
});

/**
 * @route   COMMON FUNCTION  sendMessageToUser
 * @desc    send notification to  users
 * @access  Public
 */
 const sendMessageToUser = (deviceId, notidata) => {
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type' :' application/json',
        'Authorization': 'key='+FIREBASE_SERVER_KEY
      },
      body: JSON.stringify(
        { "notification": {
          "title": notidata.title,
          "message": notidata.message
        },
          "to" : deviceId,
          "data" : notidata
        }
      )
    }, function(error, response, body) {
      if (error) { 
        console.error(error, response, body) 
      }
      else if (response.statusCode >= 400) { 
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body) 
      }
      else {
        console.log('Done!')
      }
    })
}

exports.sendMessageToUser = sendMessageToUser


/**
 * @route   COMMON FUNCTION  sendNotificationToAssignedusers
 * @desc    send notification to  users assigned to order
 * @access  Public
 */
const sendNotificationToAssignedusers = async (orderId,notidata) => {
 // get invites from group list that has order id and get distinct users according to mobile number
    let assignedGroups = await Group.findAll({scales: { $regex: '.*' + orderId + '.*' } }).select('invites -_id').sort({ created_at: -1 });
    if(assignedGroups.length == 0){
      return;
    }
    // add all mobile numbers in single array
    let allMobiles = []
    assignedGroups.forEach((grp)=>{
        grp.invites.forEach((mobile)=>{
          allMobiles.push(mobile)
        })
    })
    if(allMobiles.length == 0){
      return;
    }
    //get fcm key of that users 
    let assignedUsers = await User.findAll({ where:{mobile: { [Op.in]: allMobiles }},attributes:['fcm_key'],order:['created_at','DESC']});
    
    if(assignedUsers.length == 0){
      return;
    }
    assignedUsers.forEach(async (usr)=>{
        notidata.user = usr._id
        // make entry to nitification table
        const notification = new Notification(notidata);
        await notification.save();
        if(usr.fcm_key) {
          //send push
          sendMessageToUser(usr.fcm_key, notidata)
        }
    })
  //send notification to that user and add entry for notifications 
}