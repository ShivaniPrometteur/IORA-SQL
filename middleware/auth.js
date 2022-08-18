"use strict";

const { throwError, jwt } = require("../lib/functions");
const UserSession = require("../models/UserSession");

module.exports = (admin = false) => {
    return (req, res, next) => {
        let authorization;
        let _error = throwError("Unauthorized to access this page", "unauthorised", 401, false);
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            authorization = req.headers.authorization.split(" ")[1];
        }
        try {
            //console.log(authorization);
            if (authorization) {
                let payload = jwt.verify(authorization);
                if (payload && payload.session_id) {
                    return UserSession.findOne({where:{id:payload.session_id}})
                        .populate('user')
                        .then((session) => {
                            if (session && session.user) {
                                if (admin) {
                                    if (!session.user.admin) {
                                        return next(_error);
                                    }
                                }
                                req.session = () => session;
                                req.user = () => session.user;
                                return next();
                            }
                            return next(_error);
                        });

                }
            }
            next(_error);
        } catch (err) {
            next(_error);
        }

    }
}