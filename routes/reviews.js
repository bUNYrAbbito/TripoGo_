// routes/reviews.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../Error/error");
const { reviewSchema } = require("../joi");
const { isLoggedIn } = require("../middleware");
const { reviewAuthor } = require("../middleware");
const contReview = require("../controller/review");


// Middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) throw new ExpressError(400, error.details[0].message);
  next();
};

// Create review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(contReview.reviewCreate)
);
// Delete review
router.delete("/:reviewId", 
isLoggedIn,
reviewAuthor,
catchAsync(contReview.reviewDelete)
);


module.exports = router;
