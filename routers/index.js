const combineRouter = require("express").Router()


combineRouter.use("/user",require("./auth.router"))
combineRouter.use("/consultation",require("./consultation.router"))
combineRouter.use("/pregnancy",require("./pregnancy.tracking.router"))
combineRouter.use("/midvies",require("./midwive.router"))
combineRouter.use("/subscription",require("./subscription.router"))









module.exports = combineRouter