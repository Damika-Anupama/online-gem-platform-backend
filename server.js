// Global variables
var path = require('path'),
    express = require('express'),
    cors = require("cors"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    mongoose = require("mongoose"),
    port = process.env.PORT || 3001,
    app = express(),
    router = require("./routes/routes"),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(), // create application/json parser
    urlencodedParser = bodyParser.urlencoded({extended: false}), // create application/x-www-form-urlencoded parser
    Seller = require("./models/Seller"),
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
app.post("/register/seller", async (req, res) => {

    // Our register logic starts here
    let encryptedPassword;
    try {
        console.log(req.body)
        // Get seller input
        const {
            userName,
            password,
            businessName,
            firstName,
            lastName,
            homeNo,
            street,
            town,
            district,
            zipCode,
            email,
            identityNumber,
            telephoneNumber
        } = req.body;

        // Validate seller input
        if (!(userName && email && password && firstName && lastName && identityNumber)) {
            res.status(400).send("userName & email & password & firstName & lastName & identityNumber are required!");
        }

        // check if seller already exist
        // Validate if seller exist in our database
        const oldSeller = await Seller.findOne({email});

        if (oldSeller) {
            return res.status(409).send("Seller Already Exists. Please try again!");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const seller = await Seller.create({
            userName,
            password: encryptedPassword,
            businessName,
            firstName,
            lastName,
            homeNo,
            street,
            town,
            district,
            zipCode,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            identityNumber,
            telephoneNumber
        });
        let data = {
            time: Date(),
            userId: email,
        }
        // Create token
        // save user token
        seller.token = jwt.sign(
            data,
            process.env.TOKEN_KEY, //JWTsecretKey
            {expiresIn: "2h"}
        );

        // return new user
        res.status(201).json(seller);
    } catch (err) {
        console.log("There's an error in seller-registration authentication!", err)
    }
    // Our register logic ends here
});

// Login
app.post("/login/seller", (req, res) => {
// our login logic goes here
});
//  -----------------/Authentication---------------------------------