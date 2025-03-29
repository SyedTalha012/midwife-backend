const nodeMailer = require("nodemailer");
const { appointmentBookingTemplate } = require("./template");
require("dotenv").config()

const getSubject = (emailType) => {
    switch (emailType) {
        case "appointment":
            return "Mid Wife - New Consultation Booking";
        default:
            return "Mid Wife - New Consultation Booking";
    }
};

const selectTemplate = (mailType,username,customer_email,notes,meetingDate,meetingTime) => {
    switch (mailType) {
        case "appointment":
            return appointmentBookingTemplate(username,customer_email,notes,meetingDate,meetingTime);
        default:
            return appointmentBookingTemplate(username,customer_email,notes,meetingDate,meetingTime);
    }
};

const sendDynamicMail = async (mailType,username,customer_email,notes,meetingDate,meetingTime) => {
    try {
        let transporter =nodeMailer.createTransport({host: "smtp.gmail.com",port: 465,secure: true,auth: { user:process.env.EMAIL_ADMIN,pass: process.env.EMAIL_ADMIN_PASSWORD}});
        let html = selectTemplate(mailType,username,customer_email,notes,meetingDate,meetingTime);
        mailOptions = {from: "MidWife <no-reply@midwife.com>",to:"talhahaider074@gmail.com",subject: getSubject(mailType),html: html};
        await transporter.sendMail(mailOptions);
        return { status: 200, message: "Email sent successfully", };
    }
    catch (err) {
        console.log("error in sending dynamic email Functions", err)
        return {status: 500,message: err,};
    }
}

module.exports = {sendDynamicMail}
