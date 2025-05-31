// const express = require('express')
// const category = require('../module/categoryShema')
// const slugify =require('slugify')
// const asyncHandler=require('express-async-handler')
// const ApiError =require('../utils/apiError')
// const ApiFeatures = require('../utils/apiFeatures')

// const getAllCategory = asyncHandler(async(req,res)=>{
//     const documentsCounts = await category.countDocuments()
//     const apiFeatures = new ApiFeatures(category.find(),req.query)
//     .paginate(documentsCounts)
//     .filter()
//     .search()
//     .filter()
//     .limitFields()
//     .sort()
// //? exucte query
// const {mongooseQuery,paginationResult}=apiFeatures
// const getSubcategories = await mongooseQuery
// res
// .status(200)
// .json({result : getSubcategories.length, paginationResult , data:getSubcategories})
// })
// const getCategory=asyncHandler(async(req,res,next)=>{
//     const id = req.params.id
//     const categoryone = await category.findById(id)
//     if (!categoryone){
//         return next(new ApiError(`no category with this id : ${id}`,402))
//     }
//     res.status(200).json({data:categoryone})

// })
// const createCategory = asyncHandler(async(req,res)=>{
//     const name = req.body.name 
//     const createCategory = await category.create({
//         name : name ,
//         slug : slugify(name),
        
//     })
//     res.status(200).json({data:createCategory})
//     //.then((category)=>{res.status(200).json({data:category})})
//     //.catch((err)=>{res.status(400).send(err)})
// })
// const updateCategory = asyncHandler(async(req,res)=>{
//     const id = req.params.id 
//     const name =req.body.name
//     const updatectegory = await category.findOneAndUpdate
//     (
//         {_id:id},
//         {name},
//         {slug:slugify(name)},
//         {new:true}
//     )
//     if(!updatectegory){
//         res.status(404).json({msg:`no category with this id : ${id}`})
//     }
//     res.status(200).json({data:updatectegory})
// })
// const deletCategory = asyncHandler(async(req,res)=>{
//     const id = req.params.id
//     const deletcategory = await category.findByIdAndDelete(id)
//     if(!deletcategory){
//         res.status(404).json({msg:`no category with this id : ${id}`})
//     }
//     res.status(200).json({msg:'is deleted'})
// })

// module.exports={
//     getAllCategory,
//     getCategory,
//     createCategory,
//     updateCategory,
//     deletCategory
// }

//* 1-filtering 
    // const queryStringObj = {...req.query}
    // const excludesFields = ['page','limit','sort','fields']
    // excludesFields.forEach((field)=>delete queryStringObj[field])

//*Apply filteration using gte gt lte lt :
    // let queryString = JSON.stringify(queryStringObj)
    // queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

//*pagenation
    // const page = req.query.page*1 || 1 
    // const limit = req.query.limit*1 || 4
    // const skip = (page-1) * limit
    // let mongooseQuery =  Product.find(JSON.parse(queryString))
    // .skip(skip)
    // .limit(limit)
    // //.populate({path:'category',select:'name'}) //! FIXME
//*   Sorting
    // if(req.query.sort){
    // const sortBy =req.query.sort.split(',').join(' ')
    // mongooseQuery =mongooseQuery.sort(sortBy)
    // }
    // else{
    //     mongooseQuery =mongooseQuery.sort('-createdAt')//the last one create 
    // }
//* fields limitation
    // if(req.query.fields){
    //     const fields = req.query.fields.split(',').join(' ')
    //     mongooseQuery = mongooseQuery.select(fields)
    // }
    // else{
    //     mongooseQuery = mongooseQuery.select('-__v')
    // }
//* search 
    // if(req.query.keyword){
    //     const query ={}
    //     query.$or=[
    //         {title:{$regex:req.query.keyword ,$options : 'i'}},
    //         {description:{$regex:req.query.keyword ,$options : 'i'}}
    //     ]
    //     mongooseQuery = mongooseQuery.find(query)
    //     console.log( mongooseQuery.find(query))
    // }