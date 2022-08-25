const { body, param, query } = require("express-validator");
const rules = require("../lib/validation-helper");
const Config = require("config");

// Login rules
exports.login = rules([
    body("username", "Username is required").notEmpty().bail().isEmail().withMessage("!Invalid username"),
    body("password", "Password is required").notEmpty()
]);



// Check mongo id 
// exports.isMongoId = (field) => {
//     return rules([
//         query(field, `Invalid value ${field}`).optional().isMongoId().bail()
//     ])
// }

