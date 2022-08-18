"use strict";

    const express = require("express"),
    auth = require("../controllers/admin/authentication"),
    user = require("../controllers/admin/users"),
    scale = require("../controllers/admin/scales"),
    validater = require("../middlewares/admin-validator"),
    Order = require("../controllers/order"),
    jwtAuth = require("../middlewares/auth")(true),
    Route = express.Router();

    Route.post("/admin/login", validater.login, auth.login);
    /************* START PRIVATE ROUTES  ***********/
    Route.get("/admin/logout", jwtAuth, auth.logout)
    //users routes
    Route.post("/createuser",jwtAuth,user.createuser)
    Route.get("/users",jwtAuth,user.userlist)
    Route.get("/usersexport",jwtAuth,user.userlistexport)
    Route.delete("/del_user/:user_id",jwtAuth, user.del_user)
    Route.put("/user/:user_id",jwtAuth, user.updateuser)
    Route.get("/user/:user_id",jwtAuth, user.singleuser)
    Route.get("/dashboard",jwtAuth, user.dashboard)

    //scales routes
    Route.post("/scales",jwtAuth,scale.createscale)
    Route.delete("/scales/:scale_id",jwtAuth, scale.delete)
    Route.get("/scales/:scale_id",jwtAuth, scale.scalesById)
    Route.put("/scales/:scale_id",jwtAuth, scale.updatescale)
    Route.get("/scales",jwtAuth,scale.allscales)

    // orders routes
    Route.get("/admin/orders",jwtAuth,Order.admin_order_list)
    Route.put("/admin/update_order/:order_id",jwtAuth,Order.update_order)
    Route.get("/admin/orders/:order_id",jwtAuth,Order.orderById)

    module.exports = Route;