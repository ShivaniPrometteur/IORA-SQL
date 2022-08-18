const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Weightdata = sequelize.define("weightdata", {
   id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
     },
    api_data: {
   type: Sequelize.LONGTEXT,     //JSON,
   allowNull: false,
   //primaryKey: true,
},
device_id: {
   type: Sequelize.TEXT,
   allowNull: false,
}
});

module.exports = Weightdata;