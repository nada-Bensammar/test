const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema ({
    name :{
        type :String ,
        required : [true , ' the brand is required ' ]
    },
    slug:{
        type : String ,
        lowercase :true 
    },
    image :{
        type:String,
   },
},{timestamps:true}
)

module.exports = mongoose.model('brandShema',brandSchema )