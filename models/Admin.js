const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    _id: { type: String },
    // ------- credentials-----------
    userName: { type: String },
    password: { type: String },
    // ---------------------------------
    // ------- Admin name-----------
    firstName: { type: String },
    lastName: { type: String },
    //-------------------------------
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;