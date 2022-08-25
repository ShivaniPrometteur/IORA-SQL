const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const adminToken = sequelize.define("adminToken", {
    id:{
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
   token: {
     type: Sequelize.STRING,
     allowNull: true,
     defaultValue: "token"
     //primaryKey: true,
  }
  });
  
  module.exports = adminToken;