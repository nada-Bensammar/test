const asyncHandler=require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const multer = require('multer')
const ApiError = require('../utils/apiError')


const Product = require('../module/productSchema')
const factory = require('./handlerFactory')
const {uploadMixImages}=require('../middleware/uploadImageMiddleware')


const uploadProductImage =uploadMixImages([
    {
        name:'imageCovert',
        maxCount:1
    },
    {
        name:'image',
        maxCount:10
    }
])


const resizeProductImages = asyncHandler(async (req, res, next) => {
  // if (req.files) {
  //   return next() // Skip processing if no files i can handlit like this
  // }
  if (req.files) {
    // console.log(req.files);
    //1- Image processing for imageCover
    if (req.files.imageCovert) {
      const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`
      
      await sharp(req.files.imageCovert[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${imageCoverFileName}`)
  
      // Save image into our db
      req.body.imageCovert = imageCoverFileName
    }
    //2- Image processing for images
    if (req.files.image) {
      req.body.image = []
      await Promise.all(
        req.files.image.map(async (img, index) => {
          const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`
  
          await sharp(img.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageName}`)
  
          // Save image into our db
          req.body.image.push(imageName)
        })
      );
  
     
    }
  }
    next()
  })



// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Publi
const getAllProducts = factory.getAll(Product)

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
const getProduct=factory.getOne(Product,'reviews')

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
const createProduct = factory.createOne(Product)

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
const updateProduct =  factory.updateOne(Product)

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
const deletProduct = factory.deleteOne(Product)


module.exports={
    uploadProductImage,
    resizeProductImages,
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deletProduct
}