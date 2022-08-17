const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Group = sequelize.define("group", {
 name: {
   type: Sequelize.STRING,
   allowNull: false,
   //primaryKey: true,
},
description: {
   type: Sequelize.TEXT,
   allowNull: false,
},
invites: {
   type: Sequelize.BIGINT,
   allowNull: false,
},
scales: {
    type: Sequelize.STRING,
    allowNull: false,
 },
});

module.exports = Group;

