const {check,body}=require('express-validator')
const slugify =require('slugify')
const validationMiddleware = require('../../middleware/validationMidlleware')
const Category = require('../../module/categoryShema')
const SubCategory = require('../../module/subCategoryShema')
const createProductValidator =[
    check('title')
        .isLength({min :3})
        .withMessage('title is too short')
        .isLength({max:50})
        .withMessage('title is too long')
        .notEmpty()
        .withMessage('Product title is required')
        .custom((val , {req})=>{
            req.body.slug = slugify(val)
            return true 
        }),  
    check('description')
        .notEmpty()
        .withMessage('Product descreption is required ')
        .isLength({max:2000})
        .withMessage('Product descreption is too long '),
    check('quantity')
        .notEmpty()
        .withMessage('Product is required')
        .isNumeric()
        .withMessage('Prodcuct quantity must be numeric value'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Sold mush be numeric value'),
    check('price')
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price mush be numeric value')
        .isLength({max:32}).withMessage('Price is too long'),
    check('priceAfterDiscount')
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage('price mush be numeric value')
        .custom((value,{req})=>{
            if(req.body.price <= value){
                throw new Error('Pricer afrer discount must be lower than price')
            }
            return true
        }),
    check('imageCovert')
        .notEmpty()
        .withMessage('image covert is required'),
    check('image')
        .optional()
        .isArray()
        .withMessage('Images should be array of string'),
    check('colors')
        .optional()
        .isArray()
        .withMessage('Colors must be array of Sting '),
    check('category')
        .notEmpty()
        .withMessage('category id is required')
        .isMongoId()
        .withMessage('Invalid ID formate')      
        .custom((categoryId)=>
            Category.findById(categoryId).then((category)=>{
                if(!category){
                    return Promise.reject(
                        new Error(`Not found any category with this id ${categoryId}`)
                    )
                }
            })
        ),
    check('subCategory')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate')
        .custom((subCategoriesIds)=>
            SubCategory.find({_id:{ $exists:true, $in:subCategoriesIds}}).then((result)=>{
                if(result.length<1 || result.length != subCategoriesIds.length){
                    return Promise.reject(
                        new Error(`Invalid sub Catigories Ids `)
                    )
                }
            })
        )
        .custom((val , {req})=>{
            return SubCategory.find({category:req.body.category}).then((subCatigories)=>{
                const subCategoriesIdsInDB = []
                subCatigories.forEach((SubCategory)=>{
                    subCategoriesIdsInDB.push(SubCategory._id.toString())
                })
                // check if subcategories ids in db include subcategories in req.body (true)
            const checker = (target, arr) => target.every((v) => arr.includes(v));
            if (!checker(val, subCategoriesIdsInDB)) {
                return Promise.reject(
                new Error(`subcategories not belong to category`)
            );
            }
        })
        }),
    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate'),
    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('ratingAverage musr be a number ')
        .isLength({min:1}).withMessage('Rating must be above or equal 1.0')
        .isLength({max:5}).withMessage('Rating must be less or equal 5.0'),
    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingAverage musr be a number '),
        validationMiddleware
  ]
const getProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    validationMiddleware,
  ]
  
const updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    body('title')
    .optional()
    .custom((val , {req})=>{
             req.body.slug = slugify(val)
             return true 
         }),
      validationMiddleware,
  ]
  
const deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    validationMiddleware,
  ]

module.exports ={
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator
}