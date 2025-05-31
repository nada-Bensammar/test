const express = require('express')

const authService = require('../controller/authUser')

const {
  addToCart,
  getLoggedUserCart,
  clearCart,
  updateCartItemQuantity,
  removeSpecificCartItem,
  applyCoupon
} = require('../controller/cartController')

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'))

router.route('/').post(addToCart).get(getLoggedUserCart).put(clearCart)
router.put('/applyCoupon', applyCoupon);
router
  .route('/:itemId')
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem)

module.exports = router;