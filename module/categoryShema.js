const mongoose = require('mongoose')

const categoryShema = new mongoose.Schema({
    name :{
        type:String ,
        required:[true , 'the name of category is requier'],
        unique:[true , 'the category must be unique']
    },
    // ex : A and b => convert to =>a_and_b / human readable parts of urls
    slug:{
        type:String,  
        lowercase:true
    },
    image:String ,
}, {timestamps : true}// this provide powerful way to track the creation and modification times of documents 
)

module.exports=mongoose.model('category',categoryShema)