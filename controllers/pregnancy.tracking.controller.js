const { calculateEDDWeeksAndDays } = require("../helpers/function");
const { findUserById } = require("../services/auth.services");

const getPregnancyDetails = async (req,res)=>{
    let {id} = req.params
    let userExists = await findUserById(id);
    if (userExists.rows.length<=0) {
        return res.status(400).json({ msg: "User not found!",data:null });
    }
    else{
        let data = calculateEDDWeeksAndDays(userExists.rows[0]?.onboarding_data?.last_menstrual_date?userExists.rows[0]?.onboarding_data?.last_menstrual_date:"2025-01-01")
        res.status(201).json({ message: "User found successfully", data});
    }
}



module.exports = {getPregnancyDetails}