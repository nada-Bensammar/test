const Review= require('../module/reviewSchema')
const factory = require('./handlerFactory')


exports.setUserIdProductIdToBody  = (req,res,next)=>{
    // Nested route (Create)
    if (!req.body.product) req.body.product = req.params.productId
    if (!req.body.user) req.body.user = req.user._id
    next()
}
// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createfilterObject = (req,res,next)=>{
    let filterObject = {}
    if(req.params.productId) filterObject = {product:req.params.productId}
    req.filterObj = filterObject
    next()
}


// @desc    Get list of Reviews
// @route   GET /api/Reviews
// @access  Public
exports.getReviews = factory.getAll(Review)

// @desc    Get specific Review by id
// @route   GET /api/Reviews/:id
// @access  Public
exports.getOneReview = factory.getOne(Review)

// @desc    Create Review
// @route   POST  /api/Reviews
// @access  Private
exports.createReview = factory.createOne(Review)

// @desc    Update specific Review
// @route   PUT /api/Reviews/:id
// @access  Private
exports.updateReview =  factory.updateOne(Review) 


// @desc    Delete specific Review
// @route   DELETE /api/Review/:id
// @access  Private
exports.deletReview = factory.deleteOne(Review)


