const express = require('express')


const {
    signup,
    login,
    forgetPassword,
    verifyPassResetCode,
    resetPassword,
}=require('../controller/authUser')
const {
    signupValidtor,
    loginValidtor
}=require('../utils/validator/authValidator')

const router = express.Router()

router.post('/signup',signupValidtor,signup)
router.post('/login',loginValidtor,login)
router.post('/forgotPassword',forgetPassword)
router.post('/verifyPassResetCode',verifyPassResetCode)
router.put('/resetPassword',resetPassword)


module.exports = router