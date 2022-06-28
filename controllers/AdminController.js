const mongoose = require("mongoose");

const Admin = require("../models/Admin");

module.exports = {
    save: async (req, res) => {
        try {
            console.log(req.body);
            const admin = new Admin({
                _id: new mongoose.Types.ObjectId(), //should be unique
                userName: req.body.userName,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });

            console.log(admin);
            await admin.save((err) => {
                if (!err) {
                    return res.json({
                        success: true,
                        message: "Admin saved successfully",
                    });
                }
            });
        } catch (err) {
            console.log("Error when saving the admin!", err);
        }
    },
    getAll: async (req, res) => {
        try {
            await Admin.find()
                .exec()
                .then((admins) => {
                    res.json({
                        success: true,
                        message: "success",
                        admins: admins,
                    });
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
            console.log("Error in getting the admins!")
        }
    },
    edit: async (req, res) => {
        try {
            console.log(req.body);
            await Admin.updateOne(
                {_id: req.body.id}, //Filter
                {
                    $set: {
                        "userName": req.body.userName,
                        "password": req.body.password,
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName
                    }
                }, // Update
                {upsert: true} // add document with req.body._id if not exists
            )
                .exec()
                .then((admin) => {
                    console.log('Admin updated successfully!');
                    console.log(admin);
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
            await Admin.deleteOne({_id: req.body.id})
                .exec()
                .then((admin) => {
                    console.log("Admin deleted!");
                    console.log(admin);
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
            console.log("Error when deleting a admin!");
        }
    }
};
