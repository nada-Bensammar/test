const {validationResult}=require('express-validator')

const validationMiddleware  =(req,res ,next)=>{
    const error = validationResult(req)
    if (!error.isEmpty()){
    return res.status(404).json({error : error.array()})
    }
   next()
}

module.exports = validationMiddleware





//! fix somethings 
