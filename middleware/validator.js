const { body, check, param } = require("express-validator");
const rules = require("../lib/validation-helper");

// Register Rules
exports.register = rules([
    body("password", "password is required").notEmpty().isString(),
    body('name').isString().withMessage('Name is required'),
    body('landmark').isString().withMessage('Landmark is required'),
    body('district').isString().withMessage('District is required'),
    body('pincode').isString().withMessage('Pincode is required'),
    body('state').isString().withMessage('State is required'),
    body('city').isString().withMessage('City is required'),
    body('address').isString().withMessage("Address is required")
]);

// Login rules
// exports.login = rules([
//     body("email", "Email is required").notEmpty().bail().isEmail().withMessage('!Invalid email address'),
//     body("user_id", "User id is required").notEmpty().isString()
// ]);
exports.login = rules([
    body("username", "Email or Mobile is required").notEmpty()
]);

// Update profile
exports.update_profile = rules([
    body('name').isString().withMessage('Name is required'),
    body('city').isString().withMessage("City is required")
]);

// User settings
exports.settings = rules([
    check('prayer_time').optional().isBoolean().withMessage("Prayer time notification must be boolean"),
    check('other').optional().isBoolean().withMessage("Other type of notification must be boolean"),
]);


