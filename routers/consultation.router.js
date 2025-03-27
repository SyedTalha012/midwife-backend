const { createConsultation, getConsultationBasedOnId, getConsultationBasedOnUserId, updateConsultationDateTime, changeConsultationStatus, deleteConsultationRecord, getAllConsultationsController } = require("../controllers/consultation.controller");
const router = require("express").Router()



router.post("/create",createConsultation);
router.get("/all", getAllConsultationsController);
router.get("/:id",getConsultationBasedOnId);
router.get("/user/:id",getConsultationBasedOnUserId)
router.put("/update/time/:id",updateConsultationDateTime)
router.put("/update/status/:id",changeConsultationStatus)
router.delete("/delete/:id",deleteConsultationRecord)





module.exports = router