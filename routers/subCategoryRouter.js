const express = require('express')
const subCategoryController = require('../controller/subCategoryController')
const subCategoryValidtor =require('../utils/validator/subCategoryValidation')
//const subCategoriesRouter = require('./')
const authService =require('../controller/authUser')

router = express.Router({mergeParams:true})


router
    .route('/')
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        subCategoryController.setCategoryIdToBody,
        subCategoryValidtor.creatsubCategoryValidator,
        subCategoryController.createSubCategory
    )
    .get(subCategoryController.createfilterObject,subCategoryController.getAllSubCategries)
router
    .route('/:id')
    .get(subCategoryValidtor.getSubCategoryValidtor,subCategoryController.getSubCategory)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        subCategoryValidtor.updateSubCategoryValidator,
        subCategoryController.updateSubCategory
    )
    .delete(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        subCategoryValidtor.deletSubCategoryValidator,
        subCategoryController.deletSubCategory
    )
module.exports=router