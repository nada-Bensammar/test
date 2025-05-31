const multer = require('multer')
const ApiError = require('../utils/apiError')

const multerOption = ()=>{
    const multerStorage = multer.memoryStorage()
    const multerFilter = function(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }
        else{
            cb(new ApiError('Only Image allowed',400),false)
        }
    }
    const upload = multer({storage:multerStorage,fileFilter:multerFilter})
    return upload 
}



exports.uploadSingleImage =(fieldName) => multerOption().single(fieldName)

exports.uploadMixImages = (arrayOfFields) => multerOption().fields(arrayOfFields)


