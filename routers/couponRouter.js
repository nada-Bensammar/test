const express = require('express')

const {
  getCoupons,
  getOneCoupon,
  createCoupon,
  updateCoupon,
  deletCoupon
} = require('../controller/couponController');

const authService = require('../controller/authUser');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('admin', 'manager'));

router.route('/').get(getCoupons).post(createCoupon);
router.route('/:id').get(getOneCoupon).put(updateCoupon).delete(deletCoupon);

module.exports = router