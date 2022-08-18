const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const User = sequelize.define("user", {

   id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
     },
 name: {
   type: Sequelize.STRING,
   allowNull: false,
   //primaryKey: true,
},
address: {
   type: Sequelize.TEXT,
   allowNull: false,
},
landmark : {
   type: Sequelize.STRING,
   allowNull: false,
},
city : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 district : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 state : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 pincode : {
    type: Sequelize.BIGINT,
    allowNull: false,
 },
 country: {
    type: Sequelize.STRING,
    allowNull: false,
 },
 mobile : {
    type: Sequelize.BIGINT,
    allowNull: false,
 },
 email : {
    type: Sequelize.STRING,
    allowNull: false,

 },
 auth_id: {
    type: Sequelize.STRING,
    allowNull: false,
 },
 status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
 },
 fcm_key : {
    type: Sequelize.STRING,
    allowNull: false,
 },
 admin : {
    type: Sequelize.BOOLEAN,
    allowNull: false,
 },
 verify_mobile: {
    type: Sequelize.BOOLEAN,
    allowNull: false
    
},
verify_email:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    
},
email_otp:{
    type: Sequelize.STRING,
    allowNull: false,
   
},
mobile_otp:{
    type: Sequelize.BIGINT,
    allowNull: false,
    
},
loginmedia:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    //default:''
},
noti_status:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    //default:null
},
is_invited:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    //default:null
},
password:{
    type: Sequelize.STRING,
    allowNull: false,
    //default:null
}



});

module.exports = User;

