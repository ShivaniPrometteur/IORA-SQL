const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Scale = sequelize.define("scale", {
 name: {
   type: Sequelize.STRING,
   allowNull: false,
   //primaryKey: true,
},
capacity : {
    type: Sequelize.INTEGER,
    allowNull: false,
 },
description: {
   type: Sequelize.TEXT,
   allowNull: false,
},
price:{
    type: Sequelize.STRING,
    allowNull: false,
    
},
rent:{
    type: Sequelize.STRING,
    allowNull: false,
    
},
status : {
    type : Sequelize.BOOLEAN,
    allowNull: false,
   
}

});

module.exports = Scale;

