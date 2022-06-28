const mongoose = require("mongoose");
const Bid = require("../models/Bid");

const Gem = require("../models/Gem");
const GemSellerSell = require("../models/GemSellerSell");

module.exports = {
  saveGem: async (req, res) => {
    try {
      console.log(req.body);
      const imagePath = "http://localhost:3001/gems/" + req.file.filename; // Note: set path dynamically
      var gem = new Gem({
        _id: new mongoose.Types.ObjectId(), //should be unique
        title: req.body.title,
        description: req.body.description,
        colour: req.body.colour,
        imagePath: imagePath,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        bid: req.body.bid,
        publisher: req.body.publisher,
        buyer: req.body.buyer,
        documentPath: "",
      });
      console.log(gem);
      gem.save((err) => {
        if (!err) {
          return res.json({
            success: true,
            message: "Gem saved successfully",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  getgems: async (req, res) => {
    try {
      await Gem.find()
        .exec()
        .then((gems) => {
          res.json({
            successs: true,
            message: "sucess",
            gems: gems,
          });
        });
    } catch (error) {
      res.json({
        successs: false,
        message: "fail",
      });
    }
  },
  editGem: async (req, res) => {
    try {
      console.log(req.body);
      const documentPath =
        "http://localhost:3001/documents/" + req.body.file.filename; // Note: set path dynamically
      console.log(documentPath);
      await Gem.findOne({ _id: req.body.id })
        .exec()
        .then((gem) => {
          console.log(gem);

          gem.documentPath = documentPath;
          gem.save();

          // res.json({
          //   successs: true,
          //   message: "sucess",
          //   gem: ges,
          // });
        });
    } catch (error) {
      res.json({
        successs: false,
        message: "fail",
      });
    }
  }, 
  deleteGem: async (req, res) => { // gem id should be passed
    try {
      await Gem.deleteOne({ _id: req.body.id })
        .exec()
        .then((gem) => {
          console.log("Gem deleted!");
          console.log(gem);
        });
    } catch (error) {
      res.json({
        successs: false,
        message: "fail",
      });
    }
  },
  AddBid: async (req, res) => {
    try {
      var addBid = new Bid({
        _id: new mongoose.Types.ObjectId(),
        gId: req.body.gid,
        userId: "3234",
        bid: req.body.bid,
      });

      await Gem.findOne({ _id: req.body.gid })
        .exec()
        .then((gem) => {
          // console.log(gem.bid)
          gem.bid = req.body.bid;
          gem.save();

          // res.json({
          //   successs: true,
          //   message: "sucess",
          //   gem: ges,
          // });
        });

      console.log(addBid);
      await addBid.save();
    } catch (error) {
      res.json({
        successs: false,
        message: "fail",
      });
    }
  },
  
  // sell a gem
  sellGem: async (req, res) => {
    try {
      console.log(req.body);
      var gemSellerSell = new GemSellerSell({
        _id: new mongoose.Types.ObjectId(), //should be unique
        soldTime: new Date(),
        seller: req.body.seller,
        // gems.ad 
      });
      console.log(gemSellerSell);
      gemSellerSell.save((err) => {
        if (!err) {
          return res.json({
            success: true,
            message: "Gem saved successfully",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
