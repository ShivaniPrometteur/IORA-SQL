const User = require("../../models/User");
const Scale = require("../../models/Scale");

exports.userlist = async (req, res, next) => {
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
};

exports.userlistexport = async (req, res, next) => {
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
};

exports.dashboard = async (req, res, next) => {
    try{
        const users =  await User.findAll()
        const scales =  await Scale.findAll()
        res.json({
            status: 200,
            message: 'Users fetched successfully',
            data: {
                userscount:users.length,
                scalescount:scales.length
            }
        })       
     } catch (e) {
         res.status(500).send()
     }    
};


exports.updateStatus = async (req, res, next) => {
    try{
        const whitelist = req.body.whitelist=="true"?true:false
        const status = req.body.status=="1"?1:0
        const userid = req.body.user_id
        let user = await User.update( {
            whitelist : whitelist,
            status : status
        },{where:{id:userid}})   
        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            data: user
        })
    } catch (e) {
        res.status(500).send()
    }    
};

exports.del_user = async (req, res, next) => {
    try{
        const user_id = req.params.user_id
        const category =  await User.destroy({where:{id:user_id}})
       
        res.status(200).json({
            status: 200,
            message: 'Users deleted successfully',
            data: category
        })
    } catch (e) {
        res.status(500).send()
    }    
};

exports.updatewhitelistStatus = async (req, res, next) => {
    try{
        const whitelist = req.body.whitelist=="true"?true:false
        const userid = req.body.user_id
        let user = await User.update( {
            whitelist : whitelist
        },{where:{id:userid}})   
        res.status(200).json({
            status: 200,
            message: 'User whitelist status updated successfully',
            data: user
        })
    } catch (e) {
        res.status(500).send()
    }    
};

// exports.createuser = async (req, res) => {
//     //const userdata = new User(req.body)
// try{
//     const user = await User.create(req.body)
//     console.log(req.body)

    

//     return res.status(201).send({
//             status : 201,
//             user : user
            
//         }) //gives 201 created

        
// } catch (e) {
//    if(e.code == 11000){
//     return  res.status(400).send({ 
//         "message" : "User with this email already exist" , 
//         "errors" : e
//     })
//    }
//     res.status(400).send(e.message) //400 bad request 
// }
// }

exports.createuser = async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create(req.body);
      res.status(200).send(user);
    } catch (err) {
      res.status(404).send(err);
    }
  };


// exports.updateuser = async (req, res, next) => {
//     try{          
//         const userid = req.params.user_id
//         let findu=await User.findOne({where:{id:userid}})
//         console.log(findu);
//         let user = await User.update( req.body,{where:{id:userid}})   
//         console.log(user);
//         res.status(200).json({
//             status: 200,
//             message: 'User updated successfully',
//             data: user
//         })
//     } catch (e) {
//         res.status(500).send()
//     }  
// }


exports.updateuser = async (req, res) => {
    try {
      const user_id = req.query.user_id;
      const user = await User.findOne({ where: { id: user_id } });
      await user.update(req.body).then((result) => {
        res.status(200).send(result);
      });
    } catch (err) {
      res.status(404).send(err);
    }
  };


exports.singleuser = async (req, res, next) => {
    try{          
        const userid = req.params.user_id
        let user = await User.findOne({where:{id:userid}})   
        res.status(200).json({
            status: 200,
            message: 'User fetched successfully',
            data: user
        })
    } catch (e) {
        res.status(500).send()
    }  
}

