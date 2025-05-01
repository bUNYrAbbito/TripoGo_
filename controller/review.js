const Review = require("../models/review");
const Listing = require("../models/listing"); // Import the Listing model



module.exports.reviewCreate =async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    const { comment, rating } = req.body.review;
    const newReview = new Review({ comment, rating, author: req.user._id });// Set the author to the current user
    listing.reviews.push(newReview);


    await newReview.save();
    await listing.save();

    req.flash("success", "Successfully created a new review!");
    res.redirect(`/listing/${id}/show`);
  }


module.exports.reviewDelete = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
  
    res.redirect(`/listing/${id}/show`);
  }
