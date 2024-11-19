// Import Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

//Instantiate modules
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new
app.use(express.static(path.join(__dirname, "public"))); // serves static files from directory


mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB
mongoose.connection.on("connected", () => { //Log connection
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
//Import models
const GuestPass = require("./models/guestPass.js");
const guestPassModel = require("./models/guestPass.js");

//-----------------GET----------------------------
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.get("/guestlist", async (req,res) => {
    const allGuests = await guestPassModel.find();
    res.render("guestPass/index.ejs", {guests: allGuests});
})
//-----------------POST---------------------------
//-----------------DELETE-------------------------
//-----------------UPDATE-------------------------



//Ports
app.listen(3008, () => {
    console.log("Listening on port 3008");
  });

