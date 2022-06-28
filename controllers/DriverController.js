const mongoose = require("mongoose");

const Driver = require("../models/Driver");

module.exports = {
    save: async (req, res) => {
        try {
            console.log(req.body);
            const driver = new Driver({
                _id: new mongoose.Types.ObjectId(), //should be unique
                driverLicenseNumber: req.body.driverLicenseNumber,
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

            console.log(driver);
            await driver.save((err) => {
                if (!err) {
                    return res.json({
                        success: true,
                        message: "Driver saved successfully",
                    });
                }
            });
        } catch (err) {
            console.log("Error when saving the driver!", err);
        }
    },
    getAll: async (req, res) => {
        try {
            await Driver.find()
                .exec()
                .then((drivers) => {
                    res.json({
                        success: true,
                        message: "success",
                        drivers: drivers,
                    });
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
            console.log("Error in getting the drivers!")
        }
    },
    edit: async (req, res) => {
        try {
            console.log(req.body);
            await Driver.updateOne(
                {_id: req.body.id}, //Filter
                {
                    $set: {
                        "driverLicenseNumber": req.body.driverLicenseNumber,
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
                .then((driver) => {
                    console.log('Driver updated successfully!');
                    console.log(driver);
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
        }
    },
    delete: async (req, res) => { // buyer id should be passed
        try {
            await Driver.deleteOne({_id: req.body.id})
                .exec()
                .then((buyer) => {
                    console.log("Driver deleted!");
                    console.log(buyer);
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
            console.log("Error when deleting a driver!");
        }
    }
};
