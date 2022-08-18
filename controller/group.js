const { asyncFunc, throwError } = require("../lib/functions"),
User = require("../models/User");
const Group = require("../models/Group");
const Scale = require("../models/Scale");

/**
 * @route   POST api/addGroup
 * @desc    Add new group
 * @access  Private
 */
exports.addGroup = asyncFunc(async (req, res, next) => {
    let userdata = req.user();
    let bodydata = {           
        ...req.body,
        user: userdata._id
    }
    let group = new Group(bodydata)
     try {
            await group.save()            
            res.status(201).send({
                status: 200,
                message: res.__("Group added successfully"),
                data: group
            })
     } catch (e) {
         res.status(400).send(e) 
     }
})

/**
 * @route   GET api/group_list
 * @desc    Group List by user id
 * @access  Private
 */
 exports.groupList = asyncFunc(async (req, res, next) => {
    let userdata = req.user();
    try{
        // get group list of user
        let groups = await Group.findAll({where:{user:userdata._id}},{attributes:['title', 'user', 'description', 'created_at']},{order:['created_at','DESC']});
        // get group list assigned to user
        let assignedGroups = await Group.findAll({invites: { $regex: '.*' + userdata.mobile + '.*' } },{attributes:['title', 'user', 'description', 'created_at']},{order:['created_at','DESC']});
        if(assignedGroups.length > 0){
            groups = [...groups,...assignedGroups]
        }
        res.status(200).json({
            status: 200,
            message: 'Groups fetched successfully',
            data: groups
        })
    }catch (e) {
         res.status(400).send(e) 
     }
 })

 /**
 * @route   PUT api/edit_group
 * @desc    Edit group by id 
 * @access  Private
 */

exports.editGroup = asyncFunc(async (req, res, next) => {
    let reqData = {...req.body}
    try{
        let groupId = req.params.group_id;
        let group = await Group.update(reqData, {where:{groupId}} ); 
        return res.json({
            status: 200,
            message: res.__("Group updated successfully"),
            data: group
        });
    }catch (e) {
         res.status(400).send(e) 
     }
 })

 /**
 * @route   DELETE  api/delete_group/:group_id
 * @desc    Delete group by group_id
 * @access  Private
 */
exports.deleteGroup = asyncFunc(async (req, res, next) => {
    const group_id = req.params.group_id
    if(group_id){
        try{
            // check if groups assigned to user
            // if not delete
            let group =  await Group.findOne({where:{group_id}})
            let resMsg = 'Group Deleted Successfully';
            let resStatus = 200
            if(!group.invites || group.invites.length == 0) {
                group =  await Group.destroy({where:{id:group_id}})
            }else{
                resStatus = 400
                resMsg = 'User exist in this group. Please unassign them before deleting.';
            }
            return res.status(200).send({
                status: resStatus,
                message: resMsg,
                data: grou
            })   
         } catch (e) {
             res.status(500).send(e)
         }    
    }
})

 /**
 * @route   PUT api/assignUser
 * @desc    Assign user to group id and send sms to use app and create account 
 * @access  Private
 */
exports.assignUser = asyncFunc(async (req, res, next) => {
    let {group_id,mobile} = {...req.body}
    try{
        // check if invite already sent to user
        let group = await Group.findOne({where:{group_id}},{attributes:['invites','id']});
        let invites = group.invites;
        let mobileExist = invites.includes(mobile);
        // check if mobile already exist
        if(mobileExist == true){
            return res.json({
                status: 400,
                message: "Invite is already sent to this number.",
                data: group
            });
        }
        invites.push(mobile)
        reqData = {invites}
        group = await Group.update(  reqData, {where:{group_id}} ); 
        // send sms to user
        return res.json({
            status: 200,
            message: "User assigned successfully",
            data: {
                mobile,
                sms:'Hello, Join me on IORA. Download app from playstore.'
            }
        });
    }catch (e) {
         res.status(400).send(e) 
     }
 })
/**
 * @route   PUT api/assignScale
 * @desc    Assign scale to group id 
 * @access  Private
 */
 exports.assignScale = asyncFunc(async (req, res, next) => {
    let {group_id,scale_id} = {...req.body}
    try{
        // check if invite already sent to user
        let group = await Group.findOne({where:{group_id}},{attributes:['scales','id']});
        let scales = group.scales;
        let scaleExist = scales.includes(scale_id)
        // check if mobile already exist
        if(scaleExist == true){
            return res.json({
                status: 400,
                message: "Scale already added",
                data: group
            });
        }
        scales.push(scale_id)
        reqData = {scales}
        group = await Group.update(  reqData, { where:{group_id} } ); 
        return res.json({
            status: 200,
            message: "Scale assigned successfully",
            data : group
        });
    }catch (e) {
         res.status(400).send(e) 
     }
 })
 /**
 * @route   PUT api/unassignUser
 * @desc    UnAssign user from group id 
 * @access  Private
 */
exports.unassignUser = asyncFunc(async (req, res, next) => {
    let {group_id,mobile} = {...req.body}
    try{
        let group = await Group.findOne({where:{group_id}},{attributes:['invites','id']});
        let invites = group.invites;
        let mobileExist = invites.includes(mobile);
        let resMsg = "User unassigned successfully"
        let resStatus = 200
        if(mobileExist == true) {
            let index = invites.indexOf(mobile);
            invites.splice(index,1);
            reqData = {invites}
            group = await Group.update( reqData, {where:{group_id} } ); 
        }else{
            resMsg = 'User doesnot exist in group';
            resStatus = 400
        }
        return res.json({
            status: resStatus,
            message: resMsg,
            data:group
        });
    }catch (e) {
        res.status(400).send(e) 
    }
})
 /**
 * @route   PUT api/unassignScale
 * @desc    unassign Scale from group id 
 * @access  Private
 */
  exports.unassignScale = asyncFunc(async (req, res, next) => {
    let {group_id,scale_id} = {...req.body}
    try{
        let group = await Group.findOne({where:{group_id}},{attributes:['scales','id']});
        let scales = group.scales;
        let scaleExist = scales.includes(scale_id);
        let resMsg = "Scale unassigned successfully"
        let resStatus = 200
        if(scaleExist == true) {
            let index = scales.indexOf(scale_id);
            scales.splice(index,1);
            reqData = {scales}
            group = await Group.update(  reqData, {where:{group_id} } ); 
        }else{
            resMsg = 'Scale doesnot exist in group';
            resStatus = 400
        }
        return res.json({
            status: resStatus,
            message: resMsg,
            data:group
        });
    }catch (e) {
        res.status(400).send(e) 
    }
})

 /**
 * @route   GET api/group/:group_id
 * @desc    Group details by id 
 * @access  Private
 */

  exports.groupDataById = asyncFunc(async (req, res, next) => {
    let userdata = req.user();
    try{
        let group = await Group.findOne({where:{id:req.params.group_id}});
        let message = 'Group not Found';
        var userDetails = []
        let scaleDetails = []
        if(group) {
            message = 'Group fetched successfully';
            if(group.invites.length > 0){
                for (let i=0;i<=group.invites.length-1;i++){
                    userDetails[i] = {
                        "name": "User not registered",
                        "_id": "",
                        "mobile": group.invites[i],
                        "updated_at": "",
                        "created_at": ""
                    }
                    let user = await User.findOne({where:{mobile:group.invites[i]}},{attributes:['mobile','name']})
                    if(user){
                        userDetails[i] = user
                    }
                }
            }

            let assignedOrders = await Order.findAll( {where:{id: { [Op.in]: group.scales } }, delivery_date: { [Op.ne]: null }},{attributes:['scale','user']},{ createdAt: { [Op.gt]: TODAY_START,[Op.lt]: NOW } });           
            for (let j=0;j<=assignedOrders.length-1;j++) { 
               let scaleDetail = await Scale.findOne({where:{scale:assignedOrders[j].scale}},{attributes:['name', 'capacity', 'description', 'status']},{limit:1});
               scaleDetails[j] = {...scaleDetail._doc,order_id : assignedOrders[j]._id,user: assignedOrders[j].user}
            } 
        }
        res.status(200).json({
            status: 200,
            message,
            data: {...group._doc,userDetails,scaleDetails}
        })
    }catch (e) {
         res.status(400).send(e) 
     }
 })