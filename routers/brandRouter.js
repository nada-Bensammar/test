const express = require('express')
const brandController = require('../controller/brandController')

const authService = require('../controller/authUser')
const brandValidation = require('../utils/validator/brandValidation')
const router = express.Router()
//
router.route('/')
    .get(brandValidation.getBrnadValidator,brandController.getBrands)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        brandController.uploadBrandyImage,
        brandController.resizeImage,
        brandValidation.createBrandvalidtor,
        brandController.createBrand
    )
router.route('/:id')
    .get(brandValidation.getBrnadValidator,brandController.getOneBrand)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        brandController.uploadBrandyImage,
        brandController.resizeImage,
        brandValidation.updateBrandValidator,
        brandController.updateBrand
    )
    .delete(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        brandValidation.deletBrandyValidator,
        brandController.deletBrand
    )

module.exports = router