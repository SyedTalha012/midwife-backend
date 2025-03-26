const { getPregnancyDetails } = require("../controllers/pregnancy.tracking.controller");

const router = require("express").Router()



router.get("/weeks/:id", getPregnancyDetails);





module.exports = router