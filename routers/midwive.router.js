const { createMidwifeController,getAllMidwivesController,getMidwifeByIdController,updateMidwifeController,deleteMidwifeController, checkMidWivesAvailablity} = require("../controllers/midwives.controller");
const router = require("express").Router()

router.post("/add", createMidwifeController);
router.get("/available-slots/:date",checkMidWivesAvailablity)
router.get("/all", getAllMidwivesController);
router.get("/:id", getMidwifeByIdController);
router.put("/update/:id", updateMidwifeController);
router.delete("/delete/:id", deleteMidwifeController);

module.exports = router;

