const express = require('express')


const {
    uploadUserImage,
    resizeImage,
    getUsers ,
    getOneUser ,
    createUser ,
    updateUser , 
    deletUser ,
    changePassword,
    getLoggedUserData,
    updateLoggedUserData,
    deleteLoggedUserData,
    updateLoggedUserPassword
}=require('../controller/userController')
const {
    getUserValidator,
    createUservalidtor,
    updateUserValidator,
    deletUseryValidator,
    changeUserPassword,
    updateLoggedUserValidator,

}=require('../utils/validator/userValidator')

const authService = require('../controller/authUser')

const router = express.Router()

router.use(authService.protect)


router.get('/getMe', getLoggedUserData, getOneUser );
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData)

//router.put('/changePassword/:id',changeUserPassword,changePassword)
router.route('/')
    .get(getUsers)
    .post(
        uploadUserImage,
        resizeImage,
        createUservalidtor,
        createUser
    )
router.route('/:id')
    .get(
        getUserValidator,
        getOneUser
    )
    .put(
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser
    )
    .delete(
        deletUseryValidator,
        deletUser
    )

module.exports = router