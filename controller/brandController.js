const asyncHandler=require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')

const Brand = require('../module/brandSchema')
const factory = require('./handlerFactory')
const {uploadSingleImage}=require('../middleware/uploadImageMiddleware')

const uploadBrandyImage = uploadSingleImage('image')

const resizeImage =asyncHandler( async(req,res,next)=>{
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({quality:90})
        .toFile(`uploads/brands/${filename}`);
    req.body.image = filename
    next()
})



// @desc    Get list of brands
// @route   GET /api/brands
// @access  Public
const getBrands = factory.getAll(Brand)

// @desc    Get specific brand by id
// @route   GET /api/brands/:id
// @access  Public
const getOneBrand = factory.getOne(Brand)

// @desc    Create brand
// @route   POST  /api/brands
// @access  Private
const createBrand = factory.createOne(Brand)

// @desc    Update specific brand
// @route   PUT /api/brands/:id
// @access  Private
const updateBrand =  factory.updateOne(Brand) 


// @desc    Delete specific product
// @route   DELETE /api/products/:id
// @access  Private
const deletBrand = factory.deleteOne(Brand)


module.exports ={
    uploadBrandyImage,
    resizeImage,
    getBrands ,
    getOneBrand ,
    createBrand ,
    updateBrand , 
    deletBrand
}