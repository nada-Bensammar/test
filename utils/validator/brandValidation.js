const slugify =require('slugify')
const {check,body} = require('express-validator')
const validationMiddleware = require('../../middleware/validationMidlleware')

const getBrnadValidator = [
    check('id')
    .isMongoId()
    .withMessage('is not mongo id'),
    validationMiddleware
]
const createBrandvalidtor =[
     check('name')
    .notEmpty()
    .withMessage('name should not be empty')
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true 
    }),
    validationMiddleware
]
const updateBrandValidator =[
    check('id')
    .isMongoId()
    .withMessage('invalid category id'),
    body('name').custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true 
    }),
    validationMiddleware
]
const deletBrandyValidator =[
     check('id')
    .isMongoId()
    .withMessage('invalid category id'),
    validationMiddleware
]
module.exports ={
    getBrnadValidator,
    createBrandvalidtor,
    updateBrandValidator,
    deletBrandyValidator
}