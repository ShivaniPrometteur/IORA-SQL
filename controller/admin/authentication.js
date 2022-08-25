const { asyncFunc, throwError } = require("../../lib/functions");
const User = require("../../models/User");
const Config = require("config");
const UserSession = require("../../models/UserSession");
const jwt=require("jsonwebtoken");
const adminToken=require("../../models/adminToken")

/**
 * @route   POST api/auth/register
 * @desc    Create a new user
 * @access  Public
 */
exports.register = async (req, res, next) => {
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
};

/**
 * @route   POST api/auth/login
 * @desc    User login
 * @access  Public
 */
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    let user = await User.findOne({where:{ email: username,password:password}});   //admin:true
    if (!user) {
        throwError("!invalid login details");
    }

    let token = jwt.sign({Id: user.id.toString()},"Prometteur");

    // Throw error when not match password
    // if (!user.matchPassword(password)) {
    //     throwError("!invalid login details");
    // }

    // Let's create user session
    // let session = await user.createSession({
    //     ip: req.ip,
    //     user_agent: req.get("user_agent"),
    //     device_id: req.body.device_id,
    //     expire_time: 120
    // });
    // const tokenentry=await adminToken.create({token:token,id:1});
    // let allreadylogin=await adminToken.findOne({where:{id:1}});
    // if(allreadylogin){
    //     let newtoken=await adminToken.update({token:token},{where:{id:1}})
    // }

    return res.json({
        status: 200,
        message: "Successfully Login",
        data: {
            access_token: token
        }
    });

    

}

/**
 * @route   GET api/auth/logout
 * @desc    User logout
 * @access  Private
 */
exports.logout = async (req, res, next) => {
    await adminToken.update(null,{where:{id:1}});
    res.json({
        status: 200,
        message: "Logout successfully"
    })
}