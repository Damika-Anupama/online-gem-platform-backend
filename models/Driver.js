const mongoose = require("mongoose");

const driver = new mongoose.Schema({
    _id: { type: String },  //Driver_Id
    driverLicenseNumber: {type:Number},
    // ------- credentials-----------
    userName: { type: String },
    password: { type: String },
    // ---------------------------------
    // ------- Buyer name-----------
    firstName: { type: String },
    lastName: { type: String },
    //-------------------------------
     // ------- address -----------
     No: { type: Number },
     street: { type: String },
     town: { type: String },
     district: { type: String },
     zipCode: { type: String },
     //-------------------------------
     email: { type: String },
     identityNumber: { type: String },
     telephoneNumber: { type: Number },
});

const Driver = mongoose.model("Driver", driver);

module.exports = Driver;