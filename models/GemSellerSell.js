// this table shold be updated when a seller selles a gem

const mongoose = require("mongoose");

const SellSchema = new mongoose.Schema({
  _id: { type: String },
  soldTime: { type: Date },
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Seller"
  },
  gems:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Gem"
  }],
  shipPrice: {type: Number},
  shipDate: {type: Date},
  arrivalDate: {type: Date},

});

// const GGeem = mongoose.model("GemSellerSell", SellSchema);

module.exports = mongoose.model("GemSellerSell", SellSchema);