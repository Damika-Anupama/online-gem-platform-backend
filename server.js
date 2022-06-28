// Global variables
var path = require('path'),
    express = require('express'),
    cors = require("cors"),
    mongoose = require("mongoose"),
    port = process.env.PORT || 3001,
    app = express(),
    router = require("./routes/routes"),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    forms = multer();


// MongoDB connection
mongoose.connect(
    "mongodb+srv://Lihini:Lihini99@cluster0.gzxof.mongodb.net/Project?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
            console.log("Connection error", err.message);
        } else {
            console.log("Successfully connect to MongoDB !");
        }
    }
);
module.exports = mongoose;

// app
app.use(cors());
// read and parse application/json
app.use(bodyParser.json());  //optional
app.use(forms.array());
app.use("/gems", express.static(path.join("gems")));
app.use("/documents", express.static(path.join("documents")));
//Body-Parser Middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
//CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //bad practice
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS"
    );
    next();
});
app.use(router);
// Start Server
app.listen(port, function () {
    console.log("Server is running on port " + port);
});

//  ------------------Authentication---------------------------------

// Login
app.post("/login/seller", (req, res) => {
// our login logic goes here
});
//  -----------------/Authentication---------------------------------