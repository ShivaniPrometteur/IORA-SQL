const Sequelize = require("sequelize");



const sequelize = new Sequelize("iora", "sammy", "password", {      //Pro@8087

  host: "localhost",

  dialect: "mysql",

});

sequelize.authenticate()
.then(()=>{
  console.log("connected")
})
.catch(err=>{
  console.log("error"+err)
})

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.sequelize.sync()
.then(()=>{
  console.log("yes re sync")
})


module.exports = sequelize;