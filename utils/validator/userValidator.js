const slugify =require('slugify')
const {check,body} = require('express-validator')
const bcrypt = require('bcryptjs')

const validationMiddleware = require('../../middleware/validationMidlleware')
const User = require('../../module/userSchema')


exports.getUserValidator = [
    check('id')
    .isMongoId()
    .withMessage('is not mongo id'),
    validationMiddleware
]
exports.createUservalidtor =[
    check('name')
        .notEmpty()
        .withMessage('name should not be empty')
        .custom((val , {req})=>{
            req.body.slug = slugify(val)
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
    check('role').optional(),
    validationMiddleware
]
exports.changeUserPassword =[
    check('id')
        .isMongoId()
        .withMessage('invalid user id'),
    body('currentPassword')
        .notEmpty()
        .withMessage('You must enter your current password'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('You must enter the password confirm'),
    body('password')
        .notEmpty()
        .withMessage('You must enter new password')
        .custom(async(val,{req})=>{
            // 1) Verify current password
            const user =await User.findById(req.params.id)
            if(!user){
                throw new Error ("There is no user for this Id")
            }
            const isCorrectPassword =await bcrypt.compare(
                req.body.currentPassword,
                user.password
            )
            if(!isCorrectPassword){
                throw new Error('Incorrect current password')
            }
             // 2) Verify password confirm
            if(val !== req.body.confirmPassword){
                throw new Error('Password Confirmation incorrect')
            }
            return true
        }),
    validationMiddleware
]
exports.updateUserValidator =[
    check('id')
    .isMongoId()
    .withMessage('invalid user id'),
    body('name').custom((val , {req})=>{
        req.body.slug = slugify(val)
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
    check('phone')
          .optional()
          .isMobilePhone('ar-DZ')
          .withMessage('Is not DZ phone'),
    check('profilImg').optional(),
    check('role').optional(),
    validationMiddleware
]
exports.deletUseryValidator =[
     check('id')
    .isMongoId()
    .withMessage('invalid user id'),
    validationMiddleware
]
exports.updateLoggedUserValidator = [
    body('name')
      .optional()
      .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
    check('email')
      .notEmpty()
      .withMessage('Email required')
      .isEmail()
      .withMessage('Invalid email address')
      .custom((val) =>
        User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(new Error('E-mail already in user'));
          }
        })
      ),
    check('phone')
      .optional()
      .isMobilePhone(['ar-EG', 'ar-SA'])
      .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),
  
      validationMiddleware,
  ]