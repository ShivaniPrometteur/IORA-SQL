const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Order = sequelize.define("order", {
 name: {
   type: Sequelize.STRING,
   allowNull: false,
   //primaryKey: true,
},
description: {
   type: Sequelize.TEXT,
   allowNull: false,
},
price : {
   type: Sequelize.STRING,
   allowNull: false,
},
status : {
    type: Sequelize.BOOLEAN,
    allowNull: false,
 },
 order_id  : {
    type: Sequelize.BOOLEAN,
    allowNull: false,
 },
 delivery_date : {
    type: Sequelize.DATE,
    allowNull: false,
 },
 order_type : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 expire_date : {
    type: Sequelize.DATE,
    allowNull: false,
 },
 d_first_name : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 d_middle_name : {
    type: Sequelize.STRING,
    allowNull: false,

 },
 d_last_name : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 d_address: {
    type: Sequelize.STRING,
    allowNull: false,
 },
 d_mobile : {
    type: Sequelize.BIGINT,
    allowNull: false,
 },
 d_email : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 order_capacity: {
    type: Sequelize.STRING
    
},
commission:{
    type: Sequelize.STRING,
    
},
tax:{
    type: Sequelize.STRING,
   
},
total_price:{
    type: Sequelize.BIGINT,
    
},
device_id:{
    type: Sequelize.STRING,
    //default:''
},
weight_threshold:{
    type: Sequelize.INTEGER,
    //default:null
},
battery_threshold:{
    type: Sequelize.INTEGER,
    //default:null
},
containerWeight:{
    type: Sequelize.INTEGER,
    //default:null
},
weightPerItem:{
    type: Sequelize.INTEGER,
    //default:null
},
timeDifference:{
    type: Sequelize.INTEGER,
    //default:0
}, 
deviceStatus : {
    type : Sequelize.BOOLEAN,
    //default : true
}


});

module.exports = Order;

