const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,    
        trim:true,
        required:[true,'Name is required']
    },
    slug:{
        type:String ,
        lowercase:true,
    },
    email:{
        type:String ,
        required:[true,'Email required'],
        unique:true,
        lowercase:true 

    },
    phone:String,
    profilImg:String,

    role:{
        type:String,
        enum:['admin','user','manger'],
        default: 'user',
    },
    password:{
        type: String,
        required: [true, 'password required'],
        minlength: [6, 'Too short password'],
      },
    passwordChangedAt:Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    active: {
        type: Boolean,
        default: true,
      },
      //child reference
    wishlist:[
        {type:mongoose.Schema.ObjectId,
        ref:'product'
        }
    ],
    addresses: [
        {
          id: { type: mongoose.Schema.Types.ObjectId },
          alias: String,
          details: String,
          phone: String,
          city: String,
          postalCode: String,
        },
      ],

}, { timestamps: true })

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12)
    next()
})

module.exports = mongoose.model('user',userSchema)