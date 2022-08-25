const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const Ord = sequelize.define("ord", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT("long"),
  },
  price: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
  },
  transaction_id: {
    type: Sequelize.INTEGER,
  },
  order_id: {
    type: Sequelize.INTEGER,
  },
  delivery_date: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  d_first_name: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_middle_name: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_last_name: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_address: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  d_mobile: {
    type: Sequelize.BIGINT,
    defaultValue: null,
  },
  d_email: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  order_capacity: {
    type: Sequelize.STRING,
  },
  commission: {
    type: Sequelize.STRING,
  },
  tax: {
    type: Sequelize.INTEGER,
  },
  total_price: {
    type: Sequelize.INTEGER,
  },
  device_id: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  weight_threshold: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  battery_threshold: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  timeDifference: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
  deviceStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

module.exports = Ord;