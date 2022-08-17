const express = require("express");
const bodyParser = require("body-parser");


const sequelize = require("./db/connection");

const user = require("./models/user");
const order = require("./models/order");
const group = require("./models/group");
const notification = require("./models/Notification");
const scale = require("./models/scale");
const settings = require("./models/settings");
const usersession = require("./models/usersession");
const weightdata = require("./models/weightdata");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const port=8080;
app.listen(port,()=>{
     console.log("express connected at 8080")
})