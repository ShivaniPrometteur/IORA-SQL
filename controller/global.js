const { asyncFunc, throwError } = require("../lib/functions");
const Config = require("config");
const Setting = require("../models/Settings");
/**
 * @route   GET api/connections
 * @desc    Get connection to app screen like mind, body etc.
 * @access  Public
 */
exports.connections = asyncFunc(async (req, res, next) => {
    let connections = Config.get('connections');
    res.json({
        status: 200,
        message: null,
        data: connections
    })
})

/**
 * @route   GET api/settings
 * @desc    Get application settings
 * @access  Public
 */
 exports.settings = asyncFunc(async (req, res, next) => {
    let settings = await Setting.findAll({});
    res.json({
        status: 200,
        message: 'Settings fetched successfully',
        data: settings
    })
});