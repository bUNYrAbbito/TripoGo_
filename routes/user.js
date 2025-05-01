const express = require("express");
const router = express.Router();
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const saveRedirectUrl = require("../middleware").saveRedirectUrl;



// ====================== SIGNUP ROUTES ======================

// Render signup form
router.get("/signup", (req, res) => {
    res.render("user/signup");
});

// Handle user signup form submission
router.post("/signup",
 catchAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password); // Passport-local-mongoose handles hashing
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                console.error(err);
                return res.redirect("/signup");
            }
            req.flash("success", "Welcome to the app!");
            res.redirect("/listing");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

// ====================== LOGIN ROUTES ======================

// Render login form
router.get("/login", (req, res) => {
    res.render("user/login");
});

// Handle login form submission
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        req.flash("success", "Welcome back!");
        res.redirect("/listing"); // Redirect to the original URL or default to /listing
    }
);


// ====================== LOGOUT ROUTER ======================
router.get("/logout",
(req,res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.redirect("/listing");
        }
        req.flash("success", "Goodbye!");
        res.redirect("/listing");
    });
}
);
// ====================== EXPORT ROUTER ======================
module.exports = router;
