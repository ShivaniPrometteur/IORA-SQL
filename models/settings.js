const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Settings = sequelize.define("settings", {
    privacy_policy: {
        type: Sequelize.STRING,
        allowNull: false
        
    },
    guide: {
        type: Sequelize.STRING,
        allowNull: false
        
    },
    tax: {
        type: Sequelize.STRING,
        allowNull: false
        
    },
    commission: {
        type: Sequelize.STRING,
        allowNull: false
        
    }

});

module.exports = Settings;

