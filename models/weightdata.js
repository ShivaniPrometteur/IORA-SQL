const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Weightttdata = sequelize.define("weightttdata", {
   id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
     },
//     api_data: {
//    type: Sequelize.JSON,     //JSON,
//    allowNull: false,
//    //primaryKey: true,
// },
device_id: {
   type: Sequelize.TEXT,
   allowNull: false,
},
timeStamp: {
   type: Sequelize.TEXT,
   allowNull: false,
},
currWt: {
   type: Sequelize.TEXT,
   allowNull: false,
},
currBt: {
   type: Sequelize.TEXT,
   allowNull: false,
},

});

module.exports = Weightttdata;