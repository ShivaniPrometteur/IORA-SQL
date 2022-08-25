const { asyncFunc, throwError, throw404Error } = require("../../lib/functions");
const Scale = require("../../models/scale")
const Setting = require("../../models/Settings");


/**
 * @route   GET api/allscales
 * @desc    Get list of all allscales 
 * @access  Private
 */


exports.allscales = asyncFunc(async (req, res, next) => {
    try{
        const scales =  await Scale.findAll({})
        res.status(200).send({
            status: 200,
            message: 'Scales fetched successfully',
            data: scales
        })   
     } catch (e) {
         res.status(500).send()
     }    
});

/**
 * @route   GET api/allscalesmobile
 * @desc    Get list of all allscalesmobile 
 * @access  Private
 */

 exports.allscalesmobile = asyncFunc(async (req, res, next) => {
    try{
        const scales =  await Scale.findAll({status:true})
        // get settings
        let settings = await Setting.findAll();
        res.status(200).send({
            status: 200,
            message: 'Scales fetched successfully',
            data: scales,
            tax:settings[0].tax,
            comission:settings[0].commission
        })   
     } catch (e) {
         res.status(500).send()
     }    
});

/**
 * @route   DELETE  api/scales/:scale_id
 * @desc    Delete scale_id
 * @access  Private
 */
exports.delete = asyncFunc(async (req, res, next) => {
    const scale_id = req.params.scale_id
    if(scale_id){
        try{
            const scales =  await Scale.destroy({where:{id:scale_id}})
            res.status(200).send({
                status: 200,
                message: 'Scales Deleted successfully',
                data: scales
            })   
         } catch (e) {
             res.status(500).send(e)
         }    
    }
})



/**
 * @route   GET  api/scales/:scale_id
 * @desc    GET scale details by id 
 * @access  Private
 */
exports.scalesById = asyncFunc(async (req, res, next) => {
    const scale_id = req.params.scale_id
    if(scale_id){
        try{
           const scale = await Scale.findOne({where:{id:scale_id}})
           res.status(200).send({
            status: 200,
            message: 'scale fetched successfully',
            data: scale
        })   
        } catch (e) {
            res.status(500).send({
                msg : 'some error',
                error : e
            })
        }    
    }else{
        res.status(400).send({
            status: 400,
            message: 'Please provide scale id'
        })   
    }
})

    /**
     * @route   POST create_scale/
     * @desc    create scale
     * @access  Private
     */
    exports.createscale = asyncFunc(async (req, res) => {
            const scaledata = new Scale(req.body)
        try{
            const scale = await scaledata.save()
            res.status(201).send({ 
                status: 201,
                message: 'Scale created successfully',
                scale}) //gives 201 created
        } catch (e) {
        if(e.code == 11000){
            return  res.status(200).send({ 
                "message" : "Scale with this capacity already exist" , 
                "errors" : e
            })
        }
            res.status(400).send(e) //400 bad request 
        }
    })

    /**
     * @route   PUT scale/:scale_id
     * @desc    update user
     * @access  Private
     */
        exports.updatescale = asyncFunc(async (req, res, next) => {
            try{          
                const scale_id = req.params.scale_id

                const {name,capacity,status,description,price,rent}=req.body
                const findPersonById=await Scale.findOne({where:{id:scale_id}});
                if(!findPersonById){
                    res.status(400).send({
                        status:'error',
                        message:`Person with id ${id} not found`
                    });
                }

                if(name){findPersonById.name=name;}
                if(capacity){findPersonById.capacity=capacity;}
                if(status){findPersonById.status=status;}
                if(description){findPersonById.description=description;}
                if(price){findPersonById.price=price;}
                if(rent){findPersonById.rent=rent;}

                const scale=await findPersonById.save();
                //let scale = await Scale.update({where:{scale_id}},req.body)   
                res.status(200).json({
                    status: 200,
                    message: 'Scale updated successfully',
                    data: scale
                })
            } catch (e) {
                if(e.code == 11000){
                    return  res.status(200).send({ 
                        "message" : "Scale with this capacity already exist" , 
                        "errors" : e
                    })
                }
                    res.status(400).send(e) //400 bad request 
            }  
    })