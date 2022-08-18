const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Usersession = sequelize.define("usersession", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
       },
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    login_at: {
        type: Sequelize.DATE,
        allowNull: false,
        
    },
    expired_at: {
       type: Sequelize.DATE,
       allowNull: false,
        
    }, 
    device_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_agent : {
        type: Sequelize.STRING,
        allowNull: false,
    }


});

module.exports = Usersession;

