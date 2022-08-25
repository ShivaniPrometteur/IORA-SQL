"use strict";

const validationResult = require("express-validator").validationResult;

// Validation error handler middleware
function validateMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    let error_list = errors.array();
    return res.json({
        status: 422,
        error_code: "invalidEntities",
        message: error_list[0].msg,
        //        errors: errors.array()
    })
};


module.exports = (rules) => {
    rules.push(validateMiddleware);
    return rules;
}

