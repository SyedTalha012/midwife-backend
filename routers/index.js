const combineRouter = require("express").Router()


combineRouter.use("/user",require("./auth.router"))
combineRouter.use("/consultation",require("./consultation.router"))









module.exports = combineRouter