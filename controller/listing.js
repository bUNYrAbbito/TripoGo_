const Listing = require("../models/listing"); // Import the Listing model
const ExpressError = require("../Error/error"); // Import custom error class

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}); // Fetch all listings from database
    res.render("listing/index", { allListings }); // Render the index view with listings
  };

module.exports.createListing = async (req, res) => {
    res.render("listing/new"); // Render the new listing form
  }

module.exports.createListingPost = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  // Log the file URL for debugging
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image =  {url,filename}; 
  await newListing.save();// Set the image URL in the listing object
 // Save listing to database
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listing"); // Redirect to all listings
}


module.exports.showListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    .populate({
      path:"reviews",
      populate: { path: "author" } // Populate the author field of reviews
    })
  .populate("owner"); // Find listing by ID and populate reviews 
  // Find listing and populate reviews
    if (!listing) throw new ExpressError(404, "Listing not found"); // If not found, throw error
    res.render("listing/show", { listing }); // Render show view with listing data
  }

module.exports.editListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id); // Find listing by ID
    if (!listing) throw new ExpressError(404, "Listing not found"); // If not found, throw error
    res.render("listing/edit", { listing }); // Render the edit form with current listing data
  }


module.exports.editListingPost = async (req, res) => {
 
  
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (listing.owner.equals(req.user._id)) {
    if ( typeof req.file !== "undefined"){
      const { id } = req.params;
      const listing = await Listing.findById(id);
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename}; // Update the image URL in the listing object
      await listing.save(); 
      // Save the updated listing to the database

      await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Successfully updated listing!");
  res.redirect(`/listing/${id}/show`);
      }
  } else {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listing/${id}/show`);
  }
  
  
}


module.exports.deleteListing = async (req, res) => {
    // Use req.user instead of currentUser
    const listing = await Listing.findById(req.params.id);
    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "you do not have permission to Delete!");
      return res.redirect(`/listing/${req.params.id}/show`);
    }
    await Listing.findByIdAndDelete(req.params.id); // Delete listing by ID
    req.flash("success", "Successfully deleted listing!");
    res.redirect("/listing"); // Redirect to listings index
  }