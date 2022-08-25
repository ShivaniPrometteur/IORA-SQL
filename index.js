const express = require("express");
//const Sequelize = require("sequelize");
//const sequelize = require("../db/connection");

const bodyParser = require("body-parser");
const route = require('./routes/route');

const sequelize = require("./db/connection");

const User = require("./models/user");
const Scale = require("./models/scale");
const Order = require("./models/order");

const Notification = require("./models/Notification");

//const Ord = require("./models/orrder");
const Group = require("./models/group");



const app = express();


app.use(bodyParser.urlencoded({ extended: false }));



//User.hasOne(Notification);
//Group.hasOne(Scale); /.....
// User.hasOne(Ord);
// Scale.hasOne(Ord);
app.use('/', route);

//sequelize.sync({force:true});

const port=8080;
app.listen(port,()=>{
     console.log("express connected at 8080")
})