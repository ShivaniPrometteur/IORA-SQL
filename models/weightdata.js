const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Weightdata = sequelize.define("weightdata", {
    api_data: {
   type: Sequelize.JSON,
   allowNull: false,
   //primaryKey: true,
},
device_id: {
   type: Sequelize.TEXT,
   allowNull: false,
}
});

module.exports = Weightdata;