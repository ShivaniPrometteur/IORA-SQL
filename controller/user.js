const { asyncFunc, throwError } = require("../lib/functions")
const User = require("../models/user"),
UserSession = require("../models/UserSession"),
Helper = require("../lib/functions").helper,
Config = require('config'),
Mailer = require('../lib/mailer'),
handlebars = require("handlebars"),
fs = require("fs");
const { Op } = require("sequelize");
const jwt=require("jsonwebtoken")


exports.register = asyncFunc(async (req, res, next) => {

    let emailuser = await User.findOne({where:{email:req.body.email}})

        console.log(req.body.email)
        let mob_user = await User.findOne({where:{contact_number:req.body.contact_number}})
        console.log(req.body.contact_number)
        if(emailuser > 0 || mob_user > 0){
            return res.json({
                status: 400,
                message: "User already exist. Please login..",
            })
        } 

        
        let data=req.body
        console.log(data)

        let final =await User.create(data)

        return res.status(200).send({msg:"registered successfully",data:final})
});


exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    let user = await User.findOne({where:{ email: username,password:password}});   //admin:true
    if (!user) {
        throwError("!invalid login details");
    }

    let token = jwt.sign({Id: user.id.toString()},"Prometteur");


      return res.json({
                        status: 200,
                        message: "Logged in successfully",
                        data:user,
                        access_token: token,
                        //active_status: user.status==1?'active':'inactive'
                    });
}
            

    

    // return res.json({
    //     status: 200,
    //     message: "Successfully Login",
    //     data: {
    //         access_token: token
    //     }
    // });

    




// exports.login = asyncFunc(async (req, res, next) => {
//     console.log(req.body)
//     const { username, password } = req.body;
//     // get user                 
//     let user = await User.findOne({ where:{
//         [Op.or]:
//             {email:username},
//         [Op.or]:
//             {'mobile':username} 
            
//      }})
//     if(user){
//         if (!user.matchPassword(password)) {
//             throwError("!invalid login details");
//         }
//         //check if user is verified
//         if(user.verify_mobile == true || user.verify_email == true){       
//             // Let's create user session
//         // let session = await user.createSession({
//         //     ip: req.ip,
//         //     user_agent: req.get("user_agent"),
//         //     device_id: req.body.device_id
//         // });
//         // update the fcm key
//         user = await User.update({
//             fcm_key:req.body.fcm_key,
//             loginmedia:req.body.loginmedia
//         } , {where : {id:user.id}}); 
//         return res.json({
//                 status: 200,
//                 message: res.__("Logged in successfully"),
//                 data:user,
//                 access_token: session.token,
//                 active_status: user.status==1?'active':'inactive'
//             });
//         }else{
//             return res.json({
//                 status: 400,
//                 message: res.__("Please verify account")
//             });
//         }
//     }else{
//         return res.json({
//             status: 400,
//             message: res.__("Incorrect Credentials")
//         });
//     }
// });


exports.profile = asyncFunc(async (req, res, next) => {
    
   let data= await User.findAll({})
   console.log(data)

    return res.status(200).send({
        status: 200,
        message: "Data fetched successfully",
        data: data
    })
});


exports.update_profile = asyncFunc(async (req, res, next) => {
    try{
        //let user = req.user();
        if(req.body.current_password || req.body.new_password  ){
            // check if current password for user is same

            

            let user= await User.findOne({where:{[Op.and]:{password:req.body.current_password},[Op.and]:{id:req.body.id}}})
            if (!user) {
                return res.json({
                    status: 400,
                    message: "Current password doesnot match"
                });
            }else{  
                Helper.bcrypt.hash(req.body.new_password, async function (hash) {
                    if (hash.error) {
                        return next(hash.error);
                    }
                   await User.update({password:hash},{where:{id:req.body.id}}); 
                    next();
                });
            }
            delete req.body.current_password
            delete req.body.new_password
        }
       let  userr = await User.update(req.body,{where:{id:req.body.id}}); 
        res.json({
            'status': 200,
            'message': "Profile updated successfully",
            'data': userr
        });
    } catch (e) {
        res.status(500).send(e.message)
    } 
})


// exports.update_profile = async (req, res) => {
//     try {
//       const user = await User.findOne({
//         where: { id: req.user.id, email: req.user.email },
//       });
//       await user.update(req.body).then((result) => {
//         res.status(200).send(result);
//       });
//     } catch (err) {
//       res.status(404).send(err);
//     }
//   };

exports.settings = asyncFunc(async (req, res, next) => {
    let user = req.user()
    let payload = req.body;
    let notification = {
        prayer_time: payload.prayer_time ? payload.prayer_time : user.notification.prayer_time,
        other: payload.other ? payload.other : user.notification.other
    }
    user = await User.update({
        notification: notification
    }, {where: {id:user.id}});
    res.json({
        status: 200,
        message: "Settings were update successfull",
        data: user
    })
});

exports.logout = asyncFunc(async (req, res, next) => {
    //empty the fcm key
    await User.update( {
        fcm_key : null
    },{where:{id:req.user().id}})   
    await UserSession.destroy({where:{id:req.session().id}});
    res.json({
        status: 200,
        message: "Logout successfully"
    })
});


exports.emotion_update = asyncFunc(async (req, res, next) => {
    let user = req.user();
    user.emotion = req.emotion;
    user = await user.save();
    res.json({
        status: 200,
        message: "Your emotion update successfully",
        data: user
    })
});


exports.language = asyncFunc(async (req, res, next) => {
    const lang_code = req.params.lang_code;
    let user = req.user();
    let languages = Config.get('languages');
    let allowed_langs = Object.keys(languages);
    // Not in array throw error
    if (!allowed_langs.includes(lang_code)) {
        throwError(res.__('Invalid language value'), 'InvalidLangCode');
    }
    user.lang = lang_code;
    user = await user.save();
    res.json({
        status: 200,
        message: res.__("Your language change successfully"),
        data: user
    })
});


exports.updatefcm = asyncFunc(async (req, res, next) => {
    try{
        const fcm_key = req.body.fcm_key
        const userid =  req.body.id
        let user = await User.update({fcm_key : fcm_key},{where:{id:userid}})   
        res.status(200).json({
            status: 200,
            message: 'Fcm updated successfully'
        })
    } catch (e) {
        res.status(500).send(e.message)
    }    
});

exports.send_otp = asyncFunc(async (req, res, next) => {
    try{     
        let emailuser = await User.findOne({where:{email:req.body.email}})
        if(emailuser){
            return res.status(200).json({
                status: 400,
                message: 'User with email already exist.'
            })  
        }
        let mob_user = await User.findOne({where:{contact_number:req.body.mobile}})
        if(mob_user){
            return res.status(200).json({
                status: 400,
                message: 'User with mobile already exist.'
            }) 
         }
         let email_otp = Math.floor(100000 + Math.random() * 900000);
         let mobile_otp = Math.floor(100000 + Math.random() * 900000);
         // refernce - https://medium.com/how-tos-for-coders/send-emails-from-nodejs-applications-using-nodemailer-mailgun-handlebars-the-opensource-way-bf5363604f54
         const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../templates/otp-verification.hbs"), "utf8");
         const template = handlebars.compile(emailTemplateSource)
         const htmlToSend = template({email_otp,type:'Registration'})

         const emailImages = [{
                filename: 'facebook.png',
                path: path.join(__dirname, '../public/images/facebook.png'),
                cid: 'facebook'
        },{
                filename: 'favicon.png',
                path: path.join(__dirname, '../public/images/favicon.png'),
                cid: 'favicon'
        },{
                filename: 'instagram.png',
                path: path.join(__dirname, '../public/images/instagram.png'),
                cid: 'instagram'
        },{
                filename: 'linkedin.png',
                path: path.join(__dirname, '../public/images/linkedin.png'),
                cid: 'linkedin'
        },{
                filename: 'logo.png',
                path: path.join(__dirname, '../public/images/logo.png'),
                cid: 'logo'
        },{
                filename: 'twitter.png',
                path: path.join(__dirname, '../public/images/twitter.png'),
                cid: 'twitter'
        }]

         // send otp on email
         Mailer.sendMail({
            to: req.body.email, // list of receivers
            subject: "Otp for registration", // Subject line
            html: htmlToSend, // html body
            attachments: emailImages,
          },(error,response) =>{
            //   console.log(error,response)
          })
         // send otp on mobile
            return res.status(200).json({
                status: 200,
                message: 'Otp sent successfully on your email/ mobile.',
                data:{
                    email_otp,
                    mobile_otp
                }
            })
    } catch (e) {
        res.status(500).send(e.message)
    }    
});


exports.update_verifystatus = asyncFunc(async (req, res, next) => {
    try{
        const {username} = req.body
        let user = await User.findOne({
            where: {
               [Op.or]: {
                   email:username
               },
               [Op.or]: {
                   contact_number: username
               }
            }
           })
         if(!user){
            return res.status(400).json({
                status: 400,
                message: 'User not found. Please create account.'
            })
         }
         delete req.body.username     
         await User.update({...req.body},{where:{id:user.id}});
         return res.status(200).json({
            status: 200,
            message: 'Verification status updated.'
        })
    } catch (e) {
        res.status(500).send(e.message)
    } 
 });

 
 exports.update_noti_status = asyncFunc(async (req, res, next) => {
    try{
        await User.update({...req.body},{where:{id:req.user().id}});
        return res.status(200).json({
            status: 200,
            message: 'Notification status updated.'
        })
    } catch (e) {
        res.status(500).send()
    } 
 });

 exports.forgotPasswordOtp = asyncFunc(async (req, res, next) => {
    try{
        const {username} = req.body
        let user = await User.findOne({ 
            where:{
                [Op.or]:{ email:username},
                [Op.or]:{contact_number:username}
            }
         })
         if(!user){
            return res.status(200).json({
                status: 400,
                message: 'User not found. Please create account.'
            })
         }
         let email_otp = Math.floor(100000 + Math.random() * 900000);
         const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../templates/otp-verification.hbs"), "utf8");
         const template = handlebars.compile(emailTemplateSource);
         const htmlToSend = template({email_otp,type:'Forgot Password'});
         
        const emailImages = [{
                filename: 'facebook.png',
                path: path.join(__dirname, '../public/images/facebook.png'),
                cid: 'facebook'
        },{
                filename: 'favicon.png',
                path: path.join(__dirname, '../public/images/favicon.png'),
                cid: 'favicon'
        },{
                filename: 'instagram.png',
                path: path.join(__dirname, '../public/images/instagram.png'),
                cid: 'instagram'
        },{
                filename: 'linkedin.png',
                path: path.join(__dirname, '../public/images/linkedin.png'),
                cid: 'linkedin'
        },{
                filename: 'logo.png',
                path: path.join(__dirname, '../public/images/logo.png'),
                cid: 'logo'
        },{
                filename: 'twitter.png',
                path: path.join(__dirname, '../public/images/twitter.png'),
                cid: 'twitter'
        }];

         // send otp on email
         Mailer.sendMail({
            to: username, // list of receivers
            subject: "Otp for Forgot Password", // Subject line
            html: htmlToSend, // html body
            attachments: emailImages,
          },(error,response) =>{
            //   console.log(error,response)
          })
       
         return res.status(200).json({
            status: 200,
            otp:email_otp,
            message: 'Otp send on your email.'
        })
    } catch (e) {
        res.status(500).send(e.message)
    } 
 });


 exports.changePassword = asyncFunc(async (req, res, next) => {
    try{
        const {username,password} = req.body
        // let user = await User.findOne({ 
        //     where:{
        //         [Op.or]:{email:username},
        //         [Op.or]:{contact_number:username}
        //     }
        //  })

        let user = await User.findOne({ where:{email:username}})
         if(!user){

            var userr=await User.findOne({ where:{contact_number:username}})
        }


        if(!user && !userr){
            return res.status(200).json({
                status: 400,
                message: 'User not found. Please create account.'
            })
        }
         if(!password || password == ""){
            return res.status(200).json({
                status: 400,
                message: 'Password Cannot be empty.'
            })
         }

         Helper.bcrypt.hash(password, async function (hash) {
            if (hash.error) {
                return next(hash.error);
            }
           await User.update({password:hash},{where:{id:user.id}}); 
            next();
        });
        return res.status(200).json({
            'status': 200,
            'message': "Password changed successfully."
        });

    } catch (e) {
        res.status(500).send(e.message);
    } 
   });