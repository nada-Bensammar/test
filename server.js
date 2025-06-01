const path = require('path')
const axios = require('axios')
const morgan = require('morgan')
const express = require ('express')
const cors = require('cors')
const compression = require('compression')
const dotenv = require('dotenv')
dotenv.config({path : 'config.env'})
const  ApiError = require('./utils/apiError')

const categoryRoute =require('./routers/categoryRouter')          
const errorGlobal = require('./middleware/errorMiddleware')
//const subCategoryRoute = require('./routers/subCategoryRouter')
const brandRouter = require('./routers/brandRouter')
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authUser')
const review = require('./routers/reviewRouter')
const wishlistRouter = require('./routers/wishlistRouter')
const addressRouter = require('./routers/addressRouter')
const couponRouter = require('./routers/couponRouter')
const cartRouter = require('./routers/cartRouter')
const orderRouter = require('./routers/orderRouter')
//const  webhookCheckout = require('./routers/orderRouter')

const recommendRouter = require('./routers/recommendRouter')


//connect data base 
const dbConnect = require('./config/dbcon')
dbConnect()
const app = express()

// Enable other domains to access your application
app.use(cors());
app.options('*', cors())

// compress all responses
app.use(compression())


  

//app.get('/',(req,res)=>{
//   res.send("i try to fix something ")
//})

app.use(express.json())  
app.use(express.static(path.join(__dirname,'uploads')))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
  }

app.use('/api/category',categoryRoute)
//app.use('/api/subcategory',subCategoryRoute)

app.use('/api/brand',brandRouter)
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/review',review)
app.use('/api/wishlist',wishlistRouter)
app.use('/api/address',addressRouter)
app.use('/api/coupon',couponRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
  


app.use("/api/recommend", recommendRouter)



app.all('*',(req,res,next)=>{
   // next(new apiError('this router is nout definde ',400))
    //res.status(500).json({msg:"not found "})
    //?creat error and send it to error handling middlware 
    //const err = new Error(`Can't find this route ${req.originalUrl}`)
    next(new ApiError(`Can't find this route : ${req.originalUrl}` ,400))
    //next(err.message)
})
//* global error handling middlware
app.use(errorGlobal)

PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`the server listen in the port ${PORT}`)
})







