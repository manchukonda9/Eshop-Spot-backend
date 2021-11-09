const jwt = require('jsonwebtoken')
const Vendor = require('../models/vendor')

const vendorAuth = async(req,res,next) =>{
    try{
        console.log('Before barrer')
        console.log(req)

        // const authHeader = req.headers['Authorization']
        // const token = authHeader && authHeader.split(' ')[1]
        const token = req.header('Authorization').replace('Bearer ','')
        console.log('token verify',req)
        const decoded = jwt.verify(token,'thisismynewcourse')

        console.log(decoded)
        const vendor = await Vendor.findOne({_id:decoded._id,'tokens.token':token})
        console.log('after vendor')
        if(!vendor){
            
            throw new Error()
        }
        req.token = token
        req.vendor = vendor
        next()
        console.log(token)
   

    }catch(e){
        console.log(e)
        res.status(401).send({error: "Please authenticate"})
    }

}

module.exports = vendorAuth