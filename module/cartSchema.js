const mongoose = require('mongoose')

const cartSchema  = new mongoose.Schema({
    cartItems :[{
        product:{
        type:mongoose.Schema.ObjectId, 
        ref:'product'
        },
        color:String,
        quantity :{
            type:Number ,
            default:1
        },
        price:Number
    }],
    totalCartPrice:Number,
    totalPriceAfterDiscount:Number,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
    },
},
{timestamps:true})
module.exports = mongoose.model('cart',cartSchema)