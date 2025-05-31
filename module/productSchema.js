const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String ,
        required:true,
        trim:true,
        minlength:[3,'Too short product title '],
        maxlength:[100,'Too long product title ']
    },
    slug:{
        type:String ,
        required:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
        minlength:[30,'Too short product descrption '],
    },
    quantity:{
        type:Number,
        required:[true, 'Product quantity is required']
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'price product is required'],
        trim:true,
        max:[20000 ,'price number is too long ']
    },
    priceAfterDiscount:{
        type:Number,
    },
    imageCovert:{
        type:String,
        required:[true , 'Image covert is required']
    },
    image:[String],
    colors:[String],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:[true, 'category of product is required']
    },
    subCategory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'subCategory'
        }
    ],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'brandShema'
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
      },
    ratingsQuantity: {
        type: Number,
        default: 0,
      },
   
},
    { 
        timestamps: true,
        // to enable virtual populate
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
     }
     
)

productSchema.virtual('reviews',{
    ref:'reviews',
    foreignField:'product',
    localField:'_id',
})
// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'category',
      select: 'name -_id',
    });
    next();
  })
  const setImageURL = (doc) => {
    if (doc.imageCover) {
      const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
      doc.imageCover = imageUrl;
    }
    if (doc.images) {
      const imagesList = [];
      doc.images.forEach((image) => {
        const imageUrl = `${process.env.BASE_URL}/products/${image}`;
        imagesList.push(imageUrl);
      });
      doc.images = imagesList;
    }
  }
  // findOne, findAll and update
  productSchema.post('init', (doc) => {
    setImageURL(doc);
  });
  
  // create
  productSchema.post('save', (doc) => {
    setImageURL(doc);
  })

module.exports = mongoose.model('product',productSchema)