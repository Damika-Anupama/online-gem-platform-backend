const mongoose = require("mongoose");

const Buyer = require("../models/Buyer");

module.exports = {
    save: async (req, res) => {
        try {
            console.log(req.body);
            const buyer = new Buyer({
                _id: new mongoose.Types.ObjectId(), //should be unique
                userName: req.body.userName,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                homeNo: req.body.homeNo,
                street: req.body.street,
                town: req.body.town,
                district: req.body.district,
                zipCode: req.body.zipCode,
                email: req.body.email,
                identityNumber: req.body.identityNumber,
                telephoneNumber: req.body.telephoneNumber
            });

            console.log(buyer);
            await buyer.save((err) => {
                if (!err) {
                    return res.json({
                        success: true,
                        message: "Buyer saved successfully",
                    });
                }
            });
        } catch (err) {
            console.log("Error in saving the buyer!", err);
        }
    },
    getAll: async (req, res) => {
        try {
            await Buyer.find()
                .exec()
                .then((sellers) => {
                    res.json({
                        success: true,
                        message: "success",
                        sellers: sellers,
                    });
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
            console.log("Error in getting the buyers!")
        }
    },
    edit: async (req, res) => {
        try {
            console.log(req.body);
            await Buyer.updateOne(
                {_id: req.body.id}, //Filter
                {
                    $set: {
                        "userName": req.body.userName,
                        "password": req.body.password,
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "homeNo": req.body.homeNo,
                        "street": req.body.street,
                        "town": req.body.town,
                        "district": req.body.district,
                        "zipCode": req.body.zipCode,
                        "email": req.body.email,
                        "identityNumber": req.body.identityNumber,
                        "telephoneNumber": req.body.telephoneNumber
                    }
                }, // Update
                {upsert: true} // add document with req.body._id if not exists
            )
                .exec()
                .then((seller) => {
                    console.log('Buyer updated successfully!');
                    console.log(seller);
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
        }
    },
    delete: async (req, res) => { // seller id should be passed
        try {
            await Buyer.deleteOne({_id: req.body.id})
                .exec()
                .then((seller) => {
                    console.log("Buyer deleted!");
                    console.log(seller);
                });
        } catch (error) {
            res.json({
                successs: false,
                message: "fail",
            });
        }
    }
};
