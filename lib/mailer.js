
const nodemailer = require("nodemailer");
const Config = require("config").get("mail");

const transporter = nodemailer.createTransport({
    host: Config.host,
    port: Config.port,
    secure: false,
    auth: {
        user: Config.username,
        pass: Config.password,
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.sendMail = (data = {}, callback) => {
    let defaultOptions = {
        from: {
            name: Config.from_name,
            address: Config.from_address,
        }
    }
    let mailOptions = Object.assign(defaultOptions, data);
    return transporter.sendMail(mailOptions, callback);
};