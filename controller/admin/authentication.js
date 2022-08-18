const { asyncFunc, throwError } = require("../../lib/functions");
const User = require("../../models/User");
const Config = require("config");
const UserSession = require("../../models/UserSession");

/**
 * @route   POST api/auth/register
 * @desc    Create a new user
 * @access  Public
 */
exports.register = asyncFunc(async (req, res, next) => {
    const payload = req.body;
    let data = {
        name: payload.name,
        email: payload.email,
        password: payload.password
    };
    User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password
    }, function (err, doc) {
        if (err) {
            return next(err);
        }
        doc = doc.toObject();
        // Delete password
        if (doc.password) {
            delete doc.password;
        }
        res.json({
            success: true,
            message: "User Registration Successfully",
            data: doc
        });
    });
});

/**
 * @route   POST api/auth/login
 * @desc    User login
 * @access  Public
 */
exports.login = asyncFunc(async (req, res, next) => {
    const { username, password } = req.body;
    let user = await User.findOne({where:{ email: username, admin: true }});
    if (!user) {
        throwError("!invalid login details");
    }

    // Throw error when not match password
    if (!user.matchPassword(password)) {
        throwError("!invalid login details");
    }

    // Let's create user session
    let session = await user.createSession({
        ip: req.ip,
        user_agent: req.get("user_agent"),
        device_id: req.body.device_id,
        expire_time: 120
    });

    return res.json({
        status: 200,
        message: "Successfully Login",
        data: {
            access_token: session.token
        }
    });

})

/**
 * @route   GET api/auth/logout
 * @desc    User logout
 * @access  Private
 */
exports.logout = asyncFunc(async (req, res, next) => {
    await UserSession.destroy({where:{id:req.session().id}});
    res.json({
        status: 200,
        message: "Logout successfully"
    })
})