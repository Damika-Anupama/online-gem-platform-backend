const mongoose = require("mongoose");

const GemBureauAgent = require("../models/GemBureauAgent");

module.exports = {
    save: async (req, res) => {
        try {
            console.log(req.body);
            const gemBureauAgent = new GemBureauAgent({
                _id: new mongoose.Types.ObjectId(), //should be unique
                userName: req.body.userName,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                identityNumber: req.body.identityNumber,
                telephoneNumber: req.body.telephoneNumber
            });

            console.log(gemBureauAgent);
            await gemBureauAgent.save((err) => {
                if (!err) {
                    return res.json({
                        success: true,
                        message: "GemBureauAgent saved successfully",
                    });
                }
            });
        } catch (err) {
            console.log("Error when saving the gemBureauAgent!", err);
        }
    },
    getAll: async (req, res) => {
        try {
            await GemBureauAgent.find()
                .exec()
                .then((gemBureauAgent) => {
                    res.json({
                        success: true,
                        message: "success",
                        Agents: gemBureauAgent,
                    });
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
            console.log("Error in getting the gemBureauAgents!")
        }
    },
    edit: async (req, res) => {
        try {
            console.log(req.body);
            await GemBureauAgent.updateOne(
                {_id: req.body.id}, //Filter
                {
                    $set: {
                        "userName": req.body.userName,
                        "password": req.body.password,
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "email": req.body.email,
                        "identityNumber": req.body.identityNumber,
                        "telephoneNumber": req.body.telephoneNumber
                    }
                }, // Update
                {upsert: true} // add document with req.body._id if not exists
            )
                .exec()
                .then((gemBureauAgent) => {
                    console.log('GemBureauAgent updated successfully!');
                    console.log(gemBureauAgent);
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
            await GemBureauAgent.deleteOne({_id: req.body.id})
                .exec()
                .then((gemBureauAgent) => {
                    console.log("GemBureauAgent deleted!");
                    console.log(gemBureauAgent);
                });
        } catch (error) {
            res.json({
                success: false,
                message: "fail",
            });
            console.log("Error when deleting a gemBureauAgent!");
        }
    }
};
