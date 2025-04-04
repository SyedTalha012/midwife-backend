const { createPaymentSession } = require("../controllers/subscription.controller");
const router = require("express").Router()


router.post("/create/session",createPaymentSession)


module.exports = router