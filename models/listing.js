const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: String
      },
    price: Number,
    location: String,
    country: String,
    reviews: 
    [
        { type: Schema.Types.ObjectId,
             ref: "Review" 
            }
    ],
    owner :{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
         
});

listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing && listing.reviews && listing.reviews.length > 0) {
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }
});



module.exports = mongoose.model("Listing", listingSchema);