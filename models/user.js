const Sequelize = require("sequelize");

const sequelize = require("../db/connection");
//Order = require("../order");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  address: { type: Sequelize.STRING, allowNull: false },
  landmark: { type: Sequelize.STRING, allowNull: false },
  city: { type: Sequelize.STRING, allowNull: false },
  district: { type: Sequelize.STRING, allowNull: false },
  state: { type: Sequelize.STRING, allowNull: false },
  pincode: { type: Sequelize.BIGINT, allowNull: false },
  country: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  contact_number: { type: Sequelize.BIGINT, allowNull: false },
});

User.associate=(models)=>{
   User.hasOne(models.Ord,{
      foreignKey:'userId'
   });

  
}
//User.hasOne(Order);

module.exports = User;

// const Sequelize = require("sequelize");
// const sequelize = require("../db/connection");

// const User = sequelize.define("user", {

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
// address: {
//    type: Sequelize.TEXT,
//    allowNull: false,
// },
// landmark : {
//    type: Sequelize.STRING,
//    allowNull: false,
// },
// city : {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  district : {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  state : {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  pincode : {
//     type: Sequelize.BIGINT,
//     allowNull: false,
//  },
//  country: {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  mobile : {
//     type: Sequelize.BIGINT,
//     allowNull: false,
//  },
//  email : {
//     type: Sequelize.STRING,
//     allowNull: false,

//  },
//  auth_id: {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  status: {
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//  },
//  fcm_key : {
//     type: Sequelize.STRING,
//     allowNull: false,
//  },
//  admin : {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//  },
//  verify_mobile: {
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//     defaultValue:false
    
// },
// verify_email:{
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//     defaultValue:false

    
// },
// email_otp:{
//     type: Sequelize.STRING,
//     allowNull: true,
//     defaultValue:''
   
// },
// mobile_otp:{
//     type: Sequelize.BIGINT,
//     allowNull: true,
//     defaultValue:0
    
// },
// loginmedia:{
//     type: Sequelize.BOOLEAN,
//     allowNull:true,
//     defaultValue:false
// },
// noti_status:{
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//     defaultValue:false
// },
// is_invited:{
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//     defaultValue:false
// },
// password:{
//     type: Sequelize.STRING,
//     allowNull: false,
//     //default:null
// }



// });

// module.exports = User;

