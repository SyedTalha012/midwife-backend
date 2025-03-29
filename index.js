const express = require("express")
const cors = require("cors")
const combineRouter = require("./routers")
const {dbConnection} = require("./config/db.config")
const path = require('path');




const fruitsPath = path.join(__dirname, 'fruits');
const uploadsPath = path.join(__dirname, 'uploads');

const app = express()
const port = process.env.PORT || 3001
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/api/v1",combineRouter)
app.use("/uploads", express.static(uploadsPath));
app.use('/fruits', express.static(fruitsPath));


dbConnection();




app.use("*",(req,res)=>{ return res.status(400).json({msg:"Route Not Found",data:[],status:404})})



app.listen(port,()=>{console.log(`server is running on http://localhost:${port}`)});