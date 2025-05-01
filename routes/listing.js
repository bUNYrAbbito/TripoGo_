// Import required modules
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../Error/error");
const { listingSchema } = require("../joi");
const { isLoggedIn } = require("../middleware");
const  contListing  = require("../controller/listing");
const multer  = require('multer')
const {storage} = require('../cloudconfig')
const upload = multer({storage})


// Middleware to validate listing data using Joi schema
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) throw new ExpressError(400, error.details[0].message); // If validation fails, throw error
  next(); // Proceed to next middleware or route handler
};

// GET route to display all listings
router
.route("/")
.get(catchAsync(contListing.index))
.post(
  isLoggedIn, 
  upload.single("listing[image]"),
  catchAsync(contListing.createListingPost));



// GET route to show form to create a new listing
router.get("/new", isLoggedIn, catchAsync(contListing.createListing));

// POST route to create a new listing
router

// GET route to show a specific listing by ID
router.get("/:id/show", catchAsync(contListing.showListing)); // Fetch listing by ID and render show view

// GET route to show form to edit a specific listing
router.get("/:id/edit", isLoggedIn, catchAsync(contListing.editListing)); // Fetch listing by ID and render edit form

// PUT route to update a specific listing
router.put("/:id",
 isLoggedIn,
 upload.single("listing[image]"), 
 catchAsync(contListing.editListingPost)); // Update listing by ID




// DELETE route to remove a specific listing
router.delete("/:id", isLoggedIn, catchAsync(contListing.deleteListing)); // Delete listing by ID

// Export the router to use in app.js
module.exports = router;
