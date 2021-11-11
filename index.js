require('dotenv').config()
var path = require('path')

const express = require('express')
const cors = require("cors")


require('./src/db/mongoose');


const Customer = require('./src/models/customer')
const Vendor = require('./src/models/vendor')
const Address = require('./src/models/address')
const Cart = require('./src/models/cart')
const Order = require('./src/models/order')
const Product = require('./src/models/product')


const vendorRouter = require('./src/routers/vendor')
const customerRouter = require('./src/routers/customer')
const addressRouter = require('./src/routers/address')
const productRouter = require('./src/routers/product')
const cartRouter = require('./src/routers/cart')
const orderRouter = require('./src/routers/order')
const app = express()

const port = process.env.PORT || 5000

const multer = require('multer')


app.set('port', port);


// For parsing application/json
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin:["http://localhost:3000"],
//     credentials:true
// }));



app.use(vendorRouter)
app.use(customerRouter)
app.use(addressRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(orderRouter)

  
// For parsing application/x-www-form-urlencoded


app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port,()=>{
    console.log('server is up on port '+ port)
})