const express = require('express')
const productController = require('../controller/productController')
const productValidatation = require('../utils/validator/productValidation')
const authService =require('../controller/authUser')
const reviewRouter = require('./reviewRouter')


const router = express.Router({mergeParams:true})
// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
router.use('/:productId/reviews',reviewRouter) //! FIX ME USER IS NULL

router 
    .route('/')
    .get( productController.getAllProducts)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        productController.uploadProductImage,
        productController.resizeProductImages,
        productValidatation.createProductValidator,
        productController.createProduct
    )
router  
    .route('/:id')
    .get(productValidatation.getProductValidator,productController.getProduct)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        productController.uploadProductImage,
        productController.resizeProductImages,
        productValidatation.updateProductValidator,
        productController.updateProduct
    )
    .delete(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        productValidatation.deleteProductValidator,
        productController.deletProduct
    )

module.exports=router 