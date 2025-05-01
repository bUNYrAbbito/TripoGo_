const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //redirect url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {//Redirect to the original URL
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next(); // Proceed to the next middleware or route handler
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listing/${id}/show`);
    }
    next();
}

module.exports.reviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    // ✅ Use capital R for model and different name for variable
    let foundReview = await Review.findById(reviewId); 
    
    if (!foundReview.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect( `/listing/${id}/show`);
    }

    next();
};
