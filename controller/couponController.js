
const Coupon = require('../module/couponSchema')
const factory = require('./handlerFactory')




// @desc    Get list of Coupons
// @route   GET /api/Coupons
// @access  Private/Admin-Manager
exports.getCoupons = factory.getAll(Coupon)

// @desc    Get specific Coupon by id
// @route   GET /api/Coupons/:id
// @access  Private/Admin-Manager
exports.getOneCoupon = factory.getOne(Coupon)

// @desc    Create Coupon
// @route   POST  /api/Coupons
// @access  Private/Admin-Manager
exports.createCoupon = factory.createOne(Coupon)

// @desc    Update specific Coupon
// @route   PUT /api/Coupons/:id
// @access  Private/Admin-Manager
exports.updateCoupon =  factory.updateOne(Coupon) 


// @desc    Delete specific product
// @route   DELETE /api/products/:id
// @access  Private/Admin-Manager
exports.deletCoupon = factory.deleteOne(Coupon)


