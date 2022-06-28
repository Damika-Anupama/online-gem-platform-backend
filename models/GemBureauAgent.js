const mongoose = require("mongoose");

const gemBureauAgent = new mongoose.Schema({
    _id: { type: String }, //agent_id
    // ------- credentials-----------
    userName: { type: String },
    password: { type: String },
    // ---------------------------------
    // ------- GemBureauAgent name-----------
    firstName: { type: String },
    lastName: { type: String },
    //-------------------------------
    email: { type: String },
    identityNumber: { type: String },
    telephoneNumber: { type: Number },
});

const GemBureauAgent = mongoose.model("GemBureauAgent", gemBureauAgent);

module.exports = GemBureauAgent;