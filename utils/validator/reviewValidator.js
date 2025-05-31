
const {check,body} = require('express-validator')
const validationMiddleware = require('../../middleware/validationMidlleware')
const Review = require('../../module/reviewSchema')

const getReviewValidator = [
    check('id')
    .isMongoId()
    .withMessage('is not mongo id'),
    validationMiddleware
]
const createReviewvalidtor =[
    check('title').optional(),
    check('rating').notEmpty().withMessage('the rating is required'),
    check('user').isMongoId().withMessage('is not mongoId'),
    check('product').isMongoId().withMessage('is not mongoId')
    .custom((val, { req }) =>
      // Check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          console.log(review);
          if (review) {
            return Promise.reject(
              new Error('You already created a review before')
            )
          }
        }
      )
    ),
    validationMiddleware
] 
const updateReviewValidator =[
    check('id')
    .isMongoId()
    .withMessage('invalid category id')
    .custom((val, { req }) =>
      // Check review ownership before update
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          )
        }
      })
    ),

    validationMiddleware
]
const deletReviewyValidator =[
     check('id')
    .isMongoId()
    .withMessage('invalid category id').custom((val, { req }) => {
        // Check review ownership before update
        if (req.user.role === 'user') {
          return Review.findById(val).then((review) => {
            if (!review) {
              return Promise.reject(
                new Error(`There is no review with id ${val}`)
              );
            }
            if (review.user._id.toString() !== req.user._id.toString()) { //fix update rivew because it return object
              return Promise.reject(
                new Error(`Your are not allowed to perform this action`)
              );
            }
          });
        }
        return true
    }),
    validationMiddleware
]


module.exports ={
    getReviewValidator,
    createReviewvalidtor,
    updateReviewValidator,
    deletReviewyValidator
}