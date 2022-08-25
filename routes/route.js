const express = require('express');
//const router = express.Router();

auth = require("../controller/admin/authentication"),
    user = require("../controller/admin/users"),
    scale = require("../controller/admin/scale"),
    Validator = require("../middleware/admin-validator"),
    validator = require("../middleware/validator"),
    Order = require("../controller/order"),
    User = require("../controller/user")
    //jwtAuth = require("../middlewares/auth")(true),

    Instrument = require("../controller/instrument"),
    GlobalControl = require("../controller/global"),


   Notification = require("../controller/notification"),
   Group = require("../controller/group"),
    Route = express.Router();

    Route.post("/admin/login", Validator.login, auth.login);
    /************* START PRIVATE ROUTES  ***********/
    Route.get("/admin/logout",  auth.logout)
    //users routes
    Route.post("/createuser",user.createuser)
    Route.get("/users",user.userlist)
    Route.get("/usersexport",user.userlistexport)
    Route.delete("/del_user/:user_id",user.del_user)
    Route.put("/user/:user_id",user.updateuser)
    Route.get("/user/:user_id",user.singleuser)
    Route.get("/dashboard", user.dashboard)

    //scales routes
    Route.post("/scales",scale.createscale)
    Route.delete("/scales/:scale_id", scale.delete)
    Route.get("/scales/:scale_id",scale.scalesById)
    Route.put("/scales/:scale_id",scale.updatescale)
    Route.get("/scales",scale.allscales)

    // orders routes
    Route.get("/admin/orders",Order.admin_order_list)
    Route.put("/admin/update_order/:order_id",Order.update_order)
    Route.get("/admin/orders/:order_id",Order.orderById)


    // Global
Route.get("/settings", GlobalControl.settings);

// Api routes  
Route.post("/auth/login", validator.login, User.login);
Route.post("/auth/register",  User.register);
Route.post("/auth/sendotp", User.send_otp);
Route.put("/auth/update_verifystatus", User.update_verifystatus);
Route.post("/auth/forgotPasswordOTP", User.forgotPasswordOtp);
Route.put("/auth/changePassword", User.changePassword);
/************* START PRIVATE ROUTES  ***********/

/** User */
Route.get("/auth/logout",  User.logout);
Route.get("/auth/profile", User.profile);
Route.put("/auth/profile",  validator.update_profile, User.update_profile);
Route.put("/updatefcmkey",User.updatefcm);

Route.post("/weightData",Instrument.weightData);
Route.get("/allweightData",Instrument.allweightData);
Route.get("/mobile/allscales",scale.allscalesmobile);
Route.post("/addorder",Order.addorder);
Route.post("/orders",Order.order_list);
Route.get("/mobile/orders/:device_id",Order.orderDataBYDeviceID);
Route.post("/mobile/orders/:device_id",Order.orderDataBYDeviceID);
Route.put("/mobile/update_order/:order_id",Order.update_order);
//Notification
Route.get("/notifications",Notification.notification_list);
Route.put("/update_notification/:noti_id",Notification.update_notification);
// Group
Route.post("/addGroup",Group.addGroup);
Route.get("/group_list",Group.groupList);
Route.get("/group/:group_id",Group.groupDataById);
Route.put("/edit_group/:group_id",Group.editGroup);
Route.delete("/delete_group/:group_id",Group.deleteGroup);
Route.put("/assignUserToGroup",Group.assignUser);
Route.put("/assignScalesToGroup",Group.assignScale);
Route.put("/unassignUser",Group.unassignUser);
Route.put("/unassignScale",Group.unassignScale);
// Scale HomePage
Route.get("/scalesInHome",Order.scalesInHome);
// cron 
Route.get("/deviceConnection", Order.deviceNotSendingData);













module.exports=Route;