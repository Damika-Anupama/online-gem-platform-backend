const mongoose = require("mongoose");

const buyer = new mongoose.Schema({
    _id: {type: String, unique: true},  // buyer_Id
    // ------- credentials -----------
    userName: {type: String},
    password: {type: String},
    // ---------------------------------
    // ------- Buyer name-----------
    firstName: {type: String},
    lastName: {type: String},
    //-------------------------------
    // ------- address -----------
    homeNo: {type: Number},
    street: {type: String},
    town: {type: String},
    district: {type: String},
    zipCode: {type: String},
    //-------------------------------
    email: {type: String},
    identityNumber: {type: String},
    telephoneNumber: {type: Number},
});

const Buyer = mongoose.model("Buyer", buyer);

module.exports = Buyer;