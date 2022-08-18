"use strict";

const express = require("express"),
User = require("../controllers/user"),
Order = require("../controllers/order"),
Scale = require("../controllers/admin/scales"),
Instrument = require("../controllers/instrument"),
GlobalControl = require("../controllers/global"),
Validator = require("../middlewares/validator"),
jwtAuth = require("../middlewares/auth")(),
Notification = require("../controllers/notification"),
Group = require("../controllers/group"),
Route = express.Router();

// Global
Route.get("/settings", GlobalControl.settings);

// Api routes  
Route.post("/auth/login", Validator.login, User.login);
Route.post("/auth/register",  Validator.register,User.register);
Route.post("/auth/sendotp", User.send_otp);
Route.put("/auth/update_verifystatus", User.update_verifystatus);
Route.post("/auth/forgotPasswordOTP", User.forgotPasswordOtp);
Route.put("/auth/changePassword", User.changePassword);
/************* START PRIVATE ROUTES  ***********/

/** User */
Route.get("/auth/logout", jwtAuth, User.logout);
Route.get("/auth/profile", jwtAuth, User.profile);
Route.put("/auth/profile", jwtAuth, Validator.update_profile, User.update_profile);
Route.put("/updatefcmkey",jwtAuth,User.updatefcm);

Route.post("/weightData",Instrument.weightData);
Route.get("/allweightData",Instrument.allweightData);
Route.get("/mobile/allscales",Scale.allscalesmobile);
Route.post("/addorder",jwtAuth,Order.addorder);
Route.post("/orders",jwtAuth,Order.order_list);
Route.get("/mobile/orders/:device_id",jwtAuth,Order.orderDataBYDeviceID);
Route.post("/mobile/orders/:device_id",jwtAuth,Order.orderDataBYDeviceID);
Route.put("/mobile/update_order/:order_id",jwtAuth,Order.update_order);
//Notification
Route.get("/notifications",jwtAuth,Notification.notification_list);
Route.put("/update_notification/:noti_id",jwtAuth, Notification.update_notification);
// Group
Route.post("/addGroup",jwtAuth,Group.addGroup);
Route.get("/group_list",jwtAuth,Group.groupList);
Route.get("/group/:group_id",jwtAuth,Group.groupDataById);
Route.put("/edit_group/:group_id",jwtAuth,Group.editGroup);
Route.delete("/delete_group/:group_id",jwtAuth,Group.deleteGroup);
Route.put("/assignUserToGroup",jwtAuth,Group.assignUser);
Route.put("/assignScalesToGroup",jwtAuth,Group.assignScale);
Route.put("/unassignUser",jwtAuth,Group.unassignUser);
Route.put("/unassignScale",jwtAuth,Group.unassignScale);
// Scale HomePage
Route.get("/scalesInHome",jwtAuth,Order.scalesInHome);
// cron 
Route.get("/deviceConnection", Order.deviceNotSendingData);
module.exports = Route;