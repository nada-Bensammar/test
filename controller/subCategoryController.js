const SubCategory = require('../module/subCategoryShema')
const factory = require('./handlerFactory')

const setCategoryIdToBody  = (req,res,next)=>{
    // Nested route (Create)
    if (!req.body.category) req.body.category = req.params.categoryId
    next()
}
// Nested route
// GET /api/v1/categories/:categoryId/subcategories
const createfilterObject = (req,res,next)=>{
    let filterObject = {}
    if(req.params.categoryId) filterObject = {category:req.params.categoryId}
    req.filterObj = filterObject
    next()
}

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
const getAllSubCategries = factory.getAll(SubCategory)

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
const getSubCategory = factory.getOne(SubCategory)

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
const createSubCategory = factory.createOne(SubCategory)

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
const updateSubCategory = factory.updateOne(SubCategory)

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
const deletSubCategory = factory.deleteOne(SubCategory)


module.exports={
    getAllSubCategries,
    getSubCategory,
    createSubCategory,
    updateSubCategory,
    deletSubCategory,
    setCategoryIdToBody,
    createfilterObject
}