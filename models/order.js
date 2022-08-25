
const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT("long"),
  },
  price: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
  },
  transaction_id: {
    type: Sequelize.INTEGER,
  },
  order_id: {
    type: Sequelize.INTEGER,
  },
  delivery_date: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  d_first_name: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_middle_name: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_last_name: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_address: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_mobile: {
    type: Sequelize.BIGINT,
    defaultValue: null,
  },
  d_email: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  order_capacity: {
    type: Sequelize.STRING,
  },
  commission: {
    type: Sequelize.STRING,
  },
  tax: {
    type: Sequelize.INTEGER,
  },
  total_price: {
    type: Sequelize.INTEGER,
  },
  device_id: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  weight_threshold: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  battery_threshold: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  timeDifference: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
  deviceStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

module.exports = Order;



// const Sequelize = require("sequelize");
// const sequelize = require("../db/connection");

// const Order = sequelize.define("order", {

//    id:{
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//      },
//  name: {
//    type: Sequelize.STRING,
//    allowNull: false,
//    //primaryKey: true,
// },
// description: {
//    type: Sequelize.TEXT,
//    allowNull: false,
// },
// price : {
//    type: Sequelize.STRING,
//    allowNull: false,
// },
// status : {
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//     defaultValue:true
//  },
// //  order_id  : {
// //     type: Sequelize.BOOLEAN,
// //     allowNull: false,
// //  },
//  delivery_date : {
//     type: Sequelize.DATE,
//    // allowNull: true,
//  },
//  order_type : {
//     type: Sequelize.STRING,
//     allowNull: true,
//     defaultValue:null

//  },
//  expire_date : {
//     type: Sequelize.DATE,
//     allowNull: true,
//     defaultValue:null
//  },
//  d_first_name : {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  d_middle_name : {
//     type: Sequelize.STRING,
//     allowNull: false,

//  },
//  d_last_name : {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  d_address: {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  d_mobile : {
//     type: Sequelize.BIGINT,
//     allowNull: false,
//  },
//  d_email : {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  order_capacity: {
//     type: Sequelize.STRING
    
// },
// commission:{
//     type: Sequelize.STRING,
    
// },
// tax:{
//     type: Sequelize.STRING,
   
// },
// total_price:{
//     type: Sequelize.BIGINT,
    
// },
// device_id:{
//     type: Sequelize.STRING,
//     //default:''
// },
// weight_threshold:{
//     type: Sequelize.INTEGER,
//     //default:null
// },
// battery_threshold:{
//     type: Sequelize.INTEGER,
//     //default:null
// },
// containerWeight:{
//     type: Sequelize.INTEGER,
//     //default:null
// },
// weightPerItem:{
//     type: Sequelize.INTEGER,
//     //default:null
// },
// timeDifference:{
//     type: Sequelize.INTEGER,
//     //default:0
// }, 
// deviceStatus : {
//     type : Sequelize.BOOLEAN,
//     //default : true
// }


// });

// module.exports = Order;

