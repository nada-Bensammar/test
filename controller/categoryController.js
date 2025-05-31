const asyncHandler=require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')


const Category = require('../module/categoryShema')
const factory = require('./handlerFactory')
const {uploadSingleImage}=require('../middleware/uploadImageMiddleware')



const uploadCategoryImage = uploadSingleImage('image')

const resizeImage =asyncHandler( async(req,res,next)=>{
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`
    if (req.file){
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({quality:90})
        .toFile(`uploads/categories/${filename}`)

        req.body.image = filename
    }
   
    next()
})
// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
const getAllCategory = factory.getAll(Category)

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
const getCategory=factory.getOne(Category)

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
 const createCategory = factory.createOne(Category)

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = factory.updateOne(Category)

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deletCategory = factory.deleteOne(Category)


module.exports={
    uploadCategoryImage,
    resizeImage,
    getAllCategory,
    getCategory,
    createCategory,
    updateCategory,
    deletCategory
}