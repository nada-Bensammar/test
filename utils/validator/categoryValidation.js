const {check,body}= require('express-validator')
const slugify =require('slugify')
const validationMiddleware = require('../../middleware/validationMidlleware')

const getCategoryValidator =[ 
    check('id')
    .isMongoId()
    .withMessage('invalid category id'),
    validationMiddleware
]
const creatCategoryValidator =[
    check('name')
    .notEmpty()
    .withMessage('name should not be empty')
    .custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true 
    }),
    validationMiddleware
]
const updateCategoryValidator =[ 
    check('id')
    .isMongoId()
    .withMessage('invalid category id'),
    body('name').custom((val , {req})=>{
            req.body.slug = slugify(val)
            return true 
    }),
    validationMiddleware
]
const deletCategoryValidator =[ 
    check('id')
    .isMongoId()
    .withMessage('invalid category id'),
    validationMiddleware
]


module.exports={
    getCategoryValidator,
    creatCategoryValidator,
    updateCategoryValidator,
    deletCategoryValidator

}