//Import
const mongoose = require("mongoose");

//Schema
const guestPassSchema = new mongoose.Schema({
    name: String,
    passType: String,
    generalPassAccess: Boolean,
    sportsPassAccess: Boolean,
    premierPassAccess: Boolean,
    allAccessPass: Boolean,
})
//Model
const guestPassModel = mongoose.model("guestPassModel", guestPassSchema);
module.exports = guestPassModel;