const mongoose = require("mongoose");

const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    saveSeller: async (req, res) => {
        try {
            console.log(req.body);
            const seller = new Seller({
                _id: new mongoose.Types.ObjectId(), //should be unique
                userName: req.body.userName,
                password: req.body.password,
                businessName: req.body.businessName,
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

            console.log(seller);
            await seller.save((err) => {
                if (!err) {
                    return res.json({
                        success: true,
                        message: "seller saved successfully",
                    });
                }
            });
        } catch (err) {
            console.log("There's an error in seller-registration authentication!", err);
        }
    }, // register
    getSeller: async (req, res) => {
        try {
            await Seller.find()
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
        }
    },
    editSeller: async (req, res) => {
        try {
            console.log(req.body);
            await Seller.updateOne(
                {_id: req.body.id}, //Filter
                {
                    $set: {
                        "userName": req.body.userName,
                        "password": req.body.password,
                        "businessName": req.body.businessName,
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
                    console.log('Seller updated successfully!');
                    console.log(seller);
                });
        } catch (error) {
            res.json({
                successs: false,
                message: "fail",
            });
        }
    },
    deleteSeller: async (req, res) => { // seller id should be passed
        try {
            await Seller.deleteOne({_id: req.body.id})
                .exec()
                .then((seller) => {
                    console.log("Seller deleted!");
                    console.log(seller);
                });
        } catch (error) {
            res.json({
                successs: false,
                message: "fail",
            });
        }
    },
    signIn: async (req, res) => {
        Seller.findOne({
            email: req.body.email
        }, function(err, seller) {
            if (err) throw err;
            if (!seller || !seller.comparePassword(req.body.password)) {
                return res.status(401).json({ message: 'Authentication failed. Invalid seller or password.' });
            }
            return res.json({ token: jwt.sign({
                    userName: seller.userName
                }, 'RESTFULAPIs') });
        });
    }
};
