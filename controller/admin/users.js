const User = require("../../models/User");
const Scale = require("../../models/Scale");

exports.userlist = asyncFunc(async (req, res, next) => {
    try{
        const users =  await User.findAll({})
        res.json({
            status: 200,
            message: 'Users fetched successfully',
            data: users
        })       
     } catch (e) {
         res.status(500).send()
     }    
});

exports.userlistexport = asyncFunc(async (req, res, next) => {
    try{
        const users =  await User.findAll({attributes:['id']})
        res.json({
            status: 200,
            message: 'Users fetched successfully',
            data: users
        })       
     } catch (e) {
         res.status(500).send()
     }    
});

exports.dashboard = asyncFunc(async (req, res, next) => {
    try{
        const users =  await User.count({where:{id: { [Op.ne]: '61822a13d687cc7f3be28c3b' }}})
        const scales =  await Scale.count({})
        res.json({
            status: 200,
            message: 'Users fetched successfully',
            data: {
                users,
                scales
            }
        })       
     } catch (e) {
         res.status(500).send()
     }    
});


exports.updateStatus = asyncFunc(async (req, res, next) => {
    try{
        const whitelist = req.body.whitelist=="true"?true:false
        const status = req.body.status=="1"?1:0
        const userid = req.body.user_id
        let user = await User.update( {
            whitelist : whitelist,
            status : status
        },{where:{userid}})   
        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            data: user
        })
    } catch (e) {
        res.status(500).send()
    }    
});

exports.del_user = asyncFunc(async (req, res, next) => {
    try{
        const user_id = req.params.user_id
        const category =  await User.destroy({where:{user_id}})
       
        res.status(200).json({
            status: 200,
            message: 'Users deleted successfully',
            data: category
        })
    } catch (e) {
        res.status(500).send()
    }    
});

exports.updatewhitelistStatus = asyncFunc(async (req, res, next) => {
    try{
        const whitelist = req.body.whitelist=="true"?true:false
        const userid = req.body.user_id
        let user = await User.update( {
            whitelist : whitelist
        },{where:{userid}})   
        res.status(200).json({
            status: 200,
            message: 'User whitelist status updated successfully',
            data: user
        })
    } catch (e) {
        res.status(500).send()
    }    
});

exports.createuser = asyncFunc(async (req, res) => {
    const userdata = new User(req.body)
try{
    const user = await userdata.save()
    res.status(201).send({
            status : 201,
            user : user
        }) //gives 201 created
} catch (e) {
   if(e.code == 11000){
    return  res.status(400).send({ 
        "message" : "User with this email already exist" , 
        "errors" : e
    })
   }
    res.status(400).send(e) //400 bad request 
}
})


exports.updateuser = asyncFunc(async (req, res, next) => {
    try{          
        const userid = req.params.user_id
        let user = await User.update( req.body,{where:{userid}})   
        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            data: user
        })
    } catch (e) {
        res.status(500).send()
    }  
})


exports.singleuser = asyncFunc(async (req, res, next) => {
    try{          
        const userid = req.params.user_id
        let user = await User.findOne(userid)   
        res.status(200).json({
            status: 200,
            message: 'User fetched successfully',
            data: user
        })
    } catch (e) {
        res.status(500).send()
    }  
}) 

