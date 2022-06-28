const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    _id: { type: String },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller"
    },
    gems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Gem"
    }],
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;