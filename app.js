// ====================== IMPORTS ======================
require('dotenv').config();// Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/reviews");
const userRouter = require("./routes/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");


// ===== Custom Error Class =====
const ExpressError = require("./Error/error");

// ====================== APP SETUP ======================
const app = express();

// ====================== VIEW ENGINE SETUP ======================
// Setting EJS as the templating engine with ejs-mate for layout support
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ====================== MIDDLEWARE ======================
// Parse incoming form data
app.use(express.urlencoded({ extended: true }));
// Serve static files from /public folder
app.use(express.static(path.join(__dirname, "public")));
// Enable method override to support PUT/DELETE methods
app.use(methodOverride("_method"));


// ====================== DATABASE CONNECTION ======================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URL, {
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
    });
    console.log("(っ◔◡◔)っ ♥ ✅ Connected to DB ♥");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
};
connectDB();

// ====================== SESSION & FLASH SETUP ======================


const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  crypto : {
    secret: "my super secret",
  },
  touchAfter: 24 * 3600, // time period in seconds  
  
});

store.on("error", function (error) {
  console.log("Session store error:", error);
});
store.on("connected", function () {
  console.log("Session store connected to MongoDB Atlas");
});


const sessionOptions = {
  store,
  secret: "my super secret", // Replace with a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    // secure: true, // Enable in production when using HTTPS
  }
};








app.use(session(sessionOptions));
app.use(flash());

// ====================== PASSPORT CONFIG ======================
// Initialize passport and restore authentication state
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass flash messages to all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
   // Make current user available in all templates
  next();
});

// ====================== ROUTES ======================
// All listing-related routes
app.use("/listing", listingRoutes);
// Review routes nested under specific listings
app.use("/listing/:id/reviews", reviewRoutes);
// Authentication routes (signup, login, logout)
app.use("/", userRouter);

// ====================== ERROR HANDLING ======================

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Centralized error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message, statusCode });
});

// ====================== START SERVER ======================
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`👢😀🌜🅰👢♓😀💲🍄🅿😀🌱🍄 Server is running on port http://localhost:${PORT}/listing`);
});
