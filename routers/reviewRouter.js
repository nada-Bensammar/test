const express = require('express')


const {
   getOneReview,
   getReviews,
   createReview,
   updateReview,
   deletReview,
   setUserIdProductIdToBody,
   createfilterObject
}=require('../controller/reviewController')
const{
    getReviewValidator,
    createReviewvalidtor,
    updateReviewValidator,
    deletReviewyValidator
}=require('../utils/validator/reviewValidator')

const authService = require('../controller/authUser')


const router = express.Router() 
router.route('/')
    .get(createfilterObject,getReviews)
    .post(  
        authService.protect,
        authService.allowedTo('user'),
        setUserIdProductIdToBody,
        createReviewvalidtor,
        createReview)
router.route('/:id')
    .get(getReviewValidator,getOneReview)
    .put(  
        authService.protect,
        authService.allowedTo('user'),
        updateReviewValidator,
        updateReview
     )
    .delete(  
        authService.protect, 
        authService.allowedTo('user','admin', 'manager'),
        deletReviewyValidator,
        deletReview
    )

module.exports = router