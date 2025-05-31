const mongoose = require('mongoose')
const Product =require('./productSchema')
const reviewSchema = new mongoose.Schema ({
    title:{
        type:String,
    },
    rating :{
        type:Number,
        min: [1, 'Min ratings value is 1.0'],
        max: [5, 'Max ratings value is 5.0'],
        required: [true, 'review ratings required'],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true, 'user is required']

    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:[true, ' product is required']
    }

},{timestamps:true}
)

reviewSchema.pre(/^find/,function(next){
    this.populate({path:'user',select:'name'})
    next()
})


reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
    productId
  ) {
    const result = await this.aggregate([
      // Stage 1 : get all reviews in specific product
      {
        $match: { product: productId },
      },
      // Stage 2: Grouping reviews based on productID and calc avgRatings, ratingsQuantity
      {
        $group: {
          _id: 'product',
          avgRatings: { $avg: '$ratings' },
          ratingsQuantity: { $sum: 1 },
        },
      },
    ])
    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, {
          ratingsAverage: result[0].avgRatings,
          ratingsQuantity: result[0].ratingsQuantity,
        });
      } else {
        await Product.findByIdAndUpdate(productId, {
          ratingsAverage: 0,
          ratingsQuantity: 0,
        });
      }
}

reviewSchema.post('save', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
  })
  
  reviewSchema.post('remove', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
  })

module.exports = mongoose.model('reviews', reviewSchema )