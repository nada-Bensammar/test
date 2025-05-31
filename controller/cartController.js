const asyncHandler=require('express-async-handler')
const ApiError =require('../utils/apiError')

const Cart = require('../module/cartSchema')
const Product = require('../module/productSchema')
const Coupon = require('../module/couponSchema')

const calcTotalCartPrice =(cart)=>{
    let totalPrice = 0
    cart.cartItems.forEach((item)=>{
        totalPrice += item.quantity * item.price
    })
    cart.totalCartPrice = totalPrice
    cart.totalPriceAfterDiscount = undefined 
    return totalPrice
}

// @desc    Add product to  cart
// @route   POST /api/v1/cart
// @access  Private/User
exports.addToCart = asyncHandler (async(req,res,next)=>{
    const {productId,color}=req.body
    const product = await Product.findById(productId)
    if (!product) {
        return  next(new ApiError(`No product for this id `,404) )
       
    }

    let cart =await  Cart.findOne({user:req.user._id})
    // create cart fot logged user with product
    if (!cart){
        cart =await Cart.create({
            user:req.user._id,
            cartItems:[{
                product:productId,
                color,
                price: product.price,
            }]
        })
    }else{
        const productIndex =  cart.cartItems.findIndex(
            (Item) => Item.product.toString() === productId && Item.color === color
        )
        if (productIndex>-1){
            const cartItem = cart.cartItems[productIndex]
            cartItem.quantity +=1
            cart.cartItems[productIndex] = cartItem
        }else{
            cart.cartItems.push({
                product:productId,
                color,
                price:product.price,
            }) 
        }
        
    }
    calcTotalCartPrice(cart)
    await cart.save()

    res.status(200).json({
        status: 'success',
        message: 'Product added to cart successfully',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    })

})

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/User
exports.getLoggedUserCart = asyncHandler(async(req,res,next )=>{
    const cart = await Cart.findOne({user:req.user._id})

    if(!cart){
        return next(new ApiError(`No found any cart with this id ${req.user._id} `,404))
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    })
})

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/User
exports.removeSpecificCartItem = asyncHandler(async(req,res,next)=>{
    const cart = await Cart.findOneAndUpdate(
        {user:req.user._id}, 
        {
        $pull: { cartItems: { _id: req.params.itemId } },
        },
        { new: true }
    )
    calcTotalCartPrice(cart)
    await cart.save()

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    })
})

// @desc    clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Private/User
exports.clearCart = asyncHandler(async(req,res,next)=>{
    await Cart.findOneAndDelete({user:req.user._id})
    res.status(201).send()
})

// @desc    Update specific cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private/User
exports.updateCartItemQuantity = asyncHandler(async(req,res,next)=>{
    const { quantity } = req.body
    const cart = await Cart.findOne({user:req.user._id})
    if(!cart){
        return next(new ApiError(`Not found any Cart with this id ${req.user._id} `))
    }
    const itemIndex = cart.cartItems.findIndex(
        (item)=>item._id.toString() === req.params.itemId)
    if (itemIndex > -1) {
        const cartItem = cart.cartItems[itemIndex];
        cartItem.quantity = quantity;
        cart.cartItems[itemIndex] = cartItem;
      } else {
        return next(
          new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
        );
      }

    calcTotalCartPrice(cart)
    await cart.save()
    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
      })
})

// @desc    Apply coupon on logged user cart
// @route   PUT /api/v1/cart/applyCoupon
// @access  Private/User
exports.applyCoupon = asyncHandler(async(req,res,next)=>{
    const coupon = await Coupon.findOne(
        {name :req.body.coupon ,
             expire :{$gt:Date.now()}
        }
    )
    if(!coupon){
        return next(new ApiError(`Coupon is invalid or expired`,404))
    }
    const cart = await Cart.findOne({user:req.user._id})
    if(!cart){
        return next(new ApiError(`Not found any Cart with this id ${req.user._id} `))
    }
    const totalPrice = cart.totalCartPrice
    const totalPriceAfterDiscount =( totalPrice - (totalPrice*coupon.discount)/100).toFixed(2)
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    await cart.save()

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
      })

})