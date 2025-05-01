const mongoose = require("mongoose");
const initdata = require("./data");
const Listing = require("../models/listing");

const mongourl = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("Connection error:", err.message);
});

async function main() {
    await mongoose.connect(mongourl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    // Prepare updated data
    const updatedData = initdata.data.map((obj) => ({
        ...obj,
        owner: "6810b1480d7265b711b9d9be" // Replace with valid user ID
    }));

    await Listing.insertMany(updatedData);
    console.log("DB initialized");
}

initDB();
