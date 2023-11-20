const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");




//home
router.get("/", equipmentController.homepage);
router.get("/add", equipmentController.addEquipment);
router.post("/add", equipmentController.postEquipment);

router.get("/view/:id", equipmentController.view);
router.get("/edit/:id", equipmentController.edit); 
router.put("/edit/:id", equipmentController.editPost); 
router.delete("/edit/:id", equipmentController.deleteEquipment); 

router.post("/search", equipmentController.searchEquipment);


module.exports = router;