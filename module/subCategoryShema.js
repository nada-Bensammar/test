const mongoose = require('mongoose')
const { applyTimestamps } = require('./categoryShema')

const subCategoryShema = new mongoose.Schema({
    name:{
        type:String ,
        trim:true ,
        unique:[true , 'the subcategory must be unique ']
    },
    slug:{
        type:String ,
        lowercase : true 
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category' ,
        required : true
    }

},{timestamps:true}
)
module.exports=mongoose.model('subCategory',subCategoryShema)