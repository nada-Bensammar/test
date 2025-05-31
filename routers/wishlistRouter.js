const express = require('express')


const authService = require('../controller/authUser')

const {
    addProductToWishList,
    removeProductToWishList,
    getLoggedUserWishlist
} = require('../controller/wishlistController')


const router = express.Router()

router.use(authService.protect,authService.allowedTo('user'))

router.route('/').post(addProductToWishList).get(getLoggedUserWishlist)

router.delete('/:productId',removeProductToWishList)

module.exports = router