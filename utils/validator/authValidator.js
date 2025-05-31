const slugify = require('slugify')
const {check,body} = require('express-validator')
const bcrypt = require('bcryptjs')

const validationMiddleware = require('../../middleware/validationMidlleware')
const User = require('../../module/userSchema')


exports.signupValidtor =[
    check('name')
        .notEmpty()
        .withMessage('name should not be empty')
        .isLength({ min: 3 })
        .withMessage('Too short User name')
        .custom((val, { req }) => {
            req.body.sulg= slugify(val)
            return true
          }),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Not Email Format')
        .custom((val) =>
            User.findOne({ email: val }).then((user) => {
              if (user) {
                return Promise.reject(new Error('E-mail already in user'));
              }
            })
          ),
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password,{req})=>{
            if( password != req.body.passwordConfirm){
                throw new Error('Password Confirmation incorrect')
            }
            return true 
        }),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('password confirm is required'),
    check('phone')
        .optional()
        .isMobilePhone('ar-DZ')
        .withMessage('Is not DZ phone'),
    check('profilImg').optional(),
    validationMiddleware
]
exports.loginValidtor =[
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Not Email Format'),
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    validationMiddleware
]

