const {check,body}=require('express-validator')
const slugify =require('slugify')
const validationMiddleware = require('../../middleware/validationMidlleware')


const getSubCategoryValidtor = [
    check('id').isMongoId().withMessage('not found any sub category with this id mongo'),
    validationMiddleware
]
const creatsubCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('Name should not be empty')
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true 
    }),
    check('category')
    .notEmpty()
    .withMessage('The category id should not be empty ')
    .isMongoId().withMessage('The id is not an mongo id '),
    validationMiddleware
]
const updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('not found any sub category with this id '),
    body('name')
    .optional()
    .custom((val , {req})=>{
             req.body.slug = slugify(val)
             return true 
         }),
    validationMiddleware
]
const deletSubCategoryValidator = [
check('id').isMongoId().withMessage('not found any sub category with this id '),
body('name')
    .optional()
    .custom((val , {req})=>{
             req.body.slug = slugify(val)
             return true 
         }),
validationMiddleware
]

module.exports ={
    getSubCategoryValidtor,
    creatsubCategoryValidator,
    updateSubCategoryValidator,
    deletSubCategoryValidator
}