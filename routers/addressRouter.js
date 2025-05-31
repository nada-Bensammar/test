const express = require('express')

const authService = require('../controller/authUser')

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../controller/addressController')

const router = express.Router()

router.use(authService.protect, authService.allowedTo('user'))

router.route('/').post(addAddress).get(getLoggedUserAddresses)

router.route('/:addressId').put().delete(removeAddress)

module.exports = router

