const upload = require("../config/multer.config");
const { createAccount, loginAccount, getAccountById, editUsername, uploadProfileImage, updateOnboardingData } = require("../controllers/auth.controller")
const router = require("express").Router()



router.post("/register",createAccount);
router.post("/login",loginAccount);
router.get("/single/:id",getAccountById)
router.put("/update/onboarding-data/:id",updateOnboardingData)
router.put("/update/username/:id",editUsername)
router.put("/update/profile/:id", upload.single("image"), uploadProfileImage);





module.exports = router