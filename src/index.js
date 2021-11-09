// require('dotenv').config({
//     path: './'
// })
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../config/.env') })
require('dotenv').config()


const express = require('express')
const cors = require("cors")


require('./db/mongoose');


const Customer = require('./models/customer')
const Vendor = require('./models/vendor')
const Address = require('./models/address')
const Cart = require('./models/cart')
const Order = require('./models/order')
const Product = require('./models/product')


const vendorRouter = require('./routers/vendor')
const customerRouter = require('./routers/customer')
const addressRouter = require('./routers/address')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')
const app = express()
var session = require('express-session');

const port = process.env.PORT

const multer = require('multer')


app.set('port', port);


// For parsing application/json
app.enable('trust proxy')
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors({
    origin:["http://localhost:3000","https://eshop-spot-frontend.herokuapp.com"],
    credentials:true
}));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: "random_session",
    secret: "yryGGeugidx34otGDuSF5sD9R8g0Gü3r8",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        secure: true,
        //domain: ".herokuapp.com", REMOVE THIS HELPED ME (I dont use a domain anymore)
        httpOnly: true
    }
}));


app.use(vendorRouter)
app.use(customerRouter)
app.use(addressRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(orderRouter)

  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.listen(port,()=>{
    console.log('server is up on port '+ port)
})