const asyncHandler=require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')

const User = require('../module/userSchema')
const factory = require('./handlerFactory')
const {uploadSingleImage}=require('../middleware/uploadImageMiddleware')
const createToken = require('../utils/createToken')

exports.uploadUserImage = uploadSingleImage('profilImg')

exports.resizeImage =asyncHandler( async(req,res,next)=>{
    if(req.file){
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({quality:90})
        .toFile(`uploads/brands/${filename}`);
    req.body.image = filename}
    next()
})

// @desc    Get list of User
// @route   GET /api/User
// @access  Private
exports.getUsers = factory.getAll(User)

// @desc    Get specific User by id
// @route   GET /api/User/:id
// @access  Private
exports.getOneUser = factory.getOne(User)

// @desc    Create User
// @route   POST  /api/User
// @access  Private
exports.createUser = factory.createOne(User)

// @desc    Update specific User
// @route   PUT /api/User/:id
// @access  Private
exports.updateUser =  asyncHandler(async(req,res,next)=>{ 
    const document = await User.findByIdAndUpdate(
        req.params.id ,
        {
            name :req.body.name,
            slug:req.body.slug,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            profilImg:req.body.profilImg
        },
        {
        new:true
    })
    if (!document){
        return next(new ApiError(`No document for this id ${id}`,404))
     }
     res.status(200).json({data:document})
})
exports.changePassword = asyncHandler(async(req,res,next)=>{ 
    //console.log(bcrypt.hash(req.body.password,12))
    console.log(req.body.password)
    const document = await User.findByIdAndUpdate(
        req.params.id ,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt :Date.now()
        },
        {
        new:true
    })
    
    if (!document){
        return next(new ApiError(`No document for this id ${id}`,404))
     }
     res.status(200).json({data:document})
})


// @desc    Delete specific User
// @route   DELETE /api/User/:id
// @access  Private
exports.deletUser = factory.deleteOne(User)

// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id
    next();
  })
  
  // @desc    Update logged user password
  // @route   PUT /api/v1/users/updateMyPassword
  // @access  Private/Protect
  exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
    // 1) Update user password based user payload (req.user._id)
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true,
      }
    )
  
    // 2) Generate token
    const token = createToken(user._id)
  
    res.status(200).json({ data: user, token })
  });
  
  // @desc    Update logged user data (without password, role)
  // @route   PUT /api/v1/users/updateMe
  // @access  Private/Protect
  exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      { new: true }
    );
  
    res.status(200).json({ data: updatedUser });
  });
  
  // @desc    Deactivate logged user
  // @route   DELETE /api/v1/users/deleteMe
  // @access  Private/Protect
  exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { active: false })
  
    res.status(204).json({ status: 'Success' })
  })
