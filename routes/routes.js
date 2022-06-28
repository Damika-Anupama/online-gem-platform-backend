const router = require("express").Router();

// define main controller classes
const AdminController = require("../controllers/AdminController");
const BuyerController = require("../controllers/BuyerController");
const DriverController = require("../controllers/DriverController");
const GemBureauAgentController = require("../controllers/GemBureauAgentController");
const GemController = require("../controllers/GemController");
const SellerController = require("../controllers/SellerController");
const UserController = require("../controllers/UserController");

//services
const imageStorage = require("../helpers/imageStroge");
const documentStorage = require("../helpers/documentStorage");

// for the AdminController
router.post("/admin", AdminController.save);
router.get("/admin", AdminController.getAll);
router.delete("/admin", AdminController.delete);
router.put("/admin", AdminController.edit);

// for the BuyerController
router.put("/buyer", BuyerController.edit);
router.post("/buyer", BuyerController.save);
router.get("/buyer", BuyerController.getAll);
router.delete("/buyer", BuyerController.delete);

// for the DriverController
router.post("/driver", DriverController.save);
router.get("/driver", DriverController.getAll);
router.delete("/driver", DriverController.delete);
router.put("/driver", DriverController.edit);

// for the GemBureauAgentController
router.post("/agent", GemBureauAgentController.save);
router.get("/agent", GemBureauAgentController.getAll);
router.delete("/agent", GemBureauAgentController.delete);
router.put("/agent", GemBureauAgentController.edit);

// for the GemController
router.post("/gems", imageStorage, GemController.saveGem);
router.post("/documents", documentStorage, GemController.editGem);
router.get("/gems", GemController.getgems);
router.delete("/gems", GemController.deleteGem);
// router.put("/gems", GemController.editGem);
router.post("/addBid", GemController.AddBid);

router.post("/add/user", UserController.addUser);
router.post("/get/user", UserController.getUser);

// for the SellerController
router.post("/register/seller", SellerController.saveSeller);
router.post("/signin/seller", SellerController.signIn);
router.get("/seller", SellerController.getSeller);
router.delete("/seller", SellerController.deleteSeller);
router.put("/seller", SellerController.editSeller);


//final step = export
module.exports = router;
