const Chargebee= require("chargebee");
const { findUserById } = require("../services/auth.services");
require("dotenv").config()

const chargebee = new Chargebee({ site:process.env.Chargebee_Site, apiKey:process.env.Chargebee_Api_Key, });

const createPaymentSession = async (req, res) => {
    try {
        let {userId} = req.body
        let userExists = await findUserById(userId);
        if (userExists.rows.length<=0) {
            return res.status(400).json({ msg: "User not found!",data:null });
        }
        else{
            const result = await chargebee.pricingPageSession.createForNewSubscription({pricing_page: {id:process.env.Chargebee_Pricing_Id},customer: {id:userExists.rows[0]?.email}});
            console.log(result);
            const pricingPageSession = result.pricing_page_session;
            return res.status(200).json({data:pricingPageSession,msg:"Payment Session Created",status:201})
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({data:null,msg:"Warr Gaya Program ! ",status:500})
    }

}

module.exports = {createPaymentSession}