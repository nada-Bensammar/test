const express = require('express')
const categryController = require('../controller/categoryController')
const categoryValidatation = require('../utils/validator/categoryValidation')
const subCategoriesRouter = require('./subCategoryRouter')
const authService =require('../controller/authUser')

const router = express.Router()

router.use('/:categoryId/subcategory',subCategoriesRouter)
router 
    .route('/')
    .get( categryController.getAllCategory)
    .post(
        authService.protect,
        authService.allowedTo('admin','manger'),
        categryController.uploadCategoryImage,
        categryController.resizeImage,
        categoryValidatation.creatCategoryValidator,
        categryController.createCategory
    )
router  
    .route('/:id')
    .get(categoryValidatation.getCategoryValidator,categryController.getCategory)
    .put(
        authService.protect,
        authService.allowedTo('admin','manger'),
        categryController.uploadCategoryImage,
        categryController.resizeImage,
        categoryValidatation.updateCategoryValidator,
        categryController.updateCategory,
    )
    .delete(
        authService.protect,
        authService.allowedTo('admin','manger'),
        categoryValidatation.deletCategoryValidator,
        categryController.deletCategory
    )

module.exports=router 