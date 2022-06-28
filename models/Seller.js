const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
    _id: {type: String, unique: true},
    // ------- credentials-----------
    userName: {type: String, default: null},
    password: {type: String, default: null},
    // ---------------------------------
    businessName: {type: String},
    // ------- seller name-----------
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
    email: {type: String, unique: true},
    identityNumber: {type: String},
    telephoneNumber: {type: Number},
});

const Seller = mongoose.model("Seller", SellerSchema);

module.exports = Seller;