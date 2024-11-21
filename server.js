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
// app.use(express.static(path.join(__dirname, "public"))); // serves static files from directory

//Import models
const guestPassModel = require("./models/guestModel.js");

mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB
mongoose.connection.on("connected", () => { //Log connection
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


//-----------------GET----------------------------

app.get("/", async (req, res) => {
    // res.send("hello, friend!")
    res.render("index.ejs");
    console.log("Pulled Up Index.ejs");
})

app.get("/guestcheckin", async (req,res) => {
    res.render("guestPass/newGuestCheckIn.ejs");
    // res.redirect("/guestlist")    

})

app.get("/guestlist", async (req,res) => {
    const allGuests = await guestPassModel.find();
    res.render("guestPass/guestlist.ejs", {guestsID: allGuests});
})

app.get("/guestlist/:guestId", async (req,res) => {
    const foundGuest = await guestPassModel.findById(req.params.guestId);
    res.render("guestPass/show.ejs", { guestID: foundGuest });
});

//-----------------POST---------------------------

app.post("/guestlist", async (req,res) => {

});

app.post("/guestCheckIn", async (req,res) => {
    if (req.body.generalPassAccess === "on") {
        req.body.generalPassAccess = true;
        req.body.passType = 'General Pass';
    } else {
        req.body.generalPassAccess = false;
    }
    //Sports Pass checkbox
    if (req.body.sportsPassAccess === "on") {
        req.body.sportsPassAccess = true;
        req.body.passType = 'Sports Pass';
    } else {
        req.body.sportsPassAccess = false;
    }
    //Premier Pass checkbox
    if (req.body.premierPassAccess === "on") {
        req.body.premierPassAccess = true;
        req.body.passType = 'Premier Pass';
    } else {
        req.body.premierPassAccess = false;
    }
    //All Access Pass checkbox
    if (req.body.allAccessPass === "on") {
        req.body.allAccessPass = true;
        req.body.passType = 'All Access Pass';
    } else {
        req.body.allAccessPass = false;
    }



    const guestCheckedIn = await guestPassModel.create(req.body);
    console.log(req.body);
    res.redirect("/guestlist");
    
});


//-----------------DELETE-------------------------

app.delete("/guestlist/:guestId", async (req,res) => {
    await guest.findByIdAndDelete(req.params.guestId);

    res.redirect(`/guestlist/${req.params.guestId}`);
})
//-----------------UPDATE-------------------------



//Ports
app.listen(3007, () => {
    console.log("Listening on port 3007");
  });

