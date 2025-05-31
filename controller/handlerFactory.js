const asyncHandler=require('express-async-handler')
const ApiError =require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')


exports.deleteOne = (Model)=>
     asyncHandler(async(req,res,next)=>{
        const id = req.params.id
        const document = await Model.findByIdAndDelete(id)
        if(!document){
            return next(new ApiError(`No document for this id ${id}`,404) )
        }
         // Trigger "remove" event when update document
        await document.deleteOne()
        res.status(204).send()
    })

exports.updateOne = (Model)=> 
    asyncHandler(async(req,res,next)=>{ 
        const document = await Model.findByIdAndUpdate(req.params.id ,req.body,{
            new:true,
        })

        if (!document){
            return next(new ApiError(`No document for this id ${id}`,404))
         }

        // Trigger "save" event when update document
        document.save()
        res.status(200).json({data:document})
    })

exports.createOne = (Model)=>
    asyncHandler(async(req,res)=>{
        const newDocument = await Model.create(req.body)
        res.status(201).json({data:newDocument})
    })

exports.getOne = (Model,populationOpt)=>
    asyncHandler(async(req,res,next)=>{
        const id = req.params.id
        //build query
        let query = Model.findById(id)
        if(populationOpt){
            query = query.populate(populationOpt)
        }
        //Execute query
        const document = await query 

        if (!document){
            return next(new ApiError(`No Model with this id : ${id}`,402))
        }
        res.status(200).json({data:document})
    
    })

exports.getAll = (Model)=>
    asyncHandler(async(req,res)=>{
        let filter = {};
        if (req.filterObj) {
          filter = req.filterObj;
        }
        // Build query
        const documentsCounts = await Model.countDocuments()
        const apiFeatures = new ApiFeatures(Model.find(),req.query)
            .paginate(documentsCounts)
            .filter()
            .search()
            .filter()
            .limitFields()
            .sort()
        //? exucte query
        const {mongooseQuery,paginationResult}=apiFeatures
        const document = await mongooseQuery
       res
        .status(200)
        .json({result : document.length, paginationResult , data:document})
    })