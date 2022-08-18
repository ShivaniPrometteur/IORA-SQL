const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Group = sequelize.define("group", {
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
description: {
   type: Sequelize.TEXT,
   allowNull: false,
},
invites: {
   type: Sequelize.TEXT,
   allowNull: false,
},
scales: {
    type: Sequelize.STRING,
    allowNull: false,
 },
});

module.exports = Group;

