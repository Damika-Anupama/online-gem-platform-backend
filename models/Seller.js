const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SellerSchema = new mongoose.Schema({
    _id: {type: String},
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
    email: {type: String},
    identityNumber: {type: String},
    telephoneNumber: {type: Number},
});

SellerSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Seller", SellerSchema);