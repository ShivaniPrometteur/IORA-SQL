const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Notification = sequelize.define("notification", {

   id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
     },
 title: {
   type: Sequelize.STRING,
   allowNull: false,
   //primaryKey: true,
},
message: {
   type: Sequelize.TEXT,
   allowNull: false,
},
notistatus: {
   type: Sequelize.BOOLEAN,
   allowNull: false,
}
});

module.exports = Notification;

