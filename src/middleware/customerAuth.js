const jwt = require('jsonwebtoken')
const Customer = require('../models/customer')

const customerAuth = async(req,res,next) =>{
    try{
        console.log('Before barrer')
        const token = req.header('Authorization').replace('Bearer ','')
        console.log('token verify', token)
        const decoded = jwt.verify(token,'thisismynewcourse')

        console.log(decoded)
        const customer = await Customer.findOne({_id:decoded._id,'tokens.token':token})
        console.log('after customer')
        if(!customer){
            console.log(customer)

            throw new Error()
        }
        console.log("Coming here")

        req.token = token
        req.customer = customer
        next()
        console.log(token)
   

    }catch(e){
        console.log("here in auth error customer")
        res.status(401).send({error: "Please authenticate"})
    }

}

module.exports = customerAuth