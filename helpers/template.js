

module.exports = {
    appointmentBookingTemplate: (username,customer_email,notes,meetingDate,meetingTime) => {
        return `
        <!DOCTYPE html>
        <html lang="en">
      
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media only screen and (max-width: 600px) {
              .container { width: 95%;}
            }
            @media only screen and (min-width: 601px) {
              .container { width: 50%; }
            }
          </style>
        </head>
      
        <body style='background-color:#fafaf5;padding-top:5px'>
          <div style='display:flex;margin-bottom:10px;margin-top:10px'>
            <img src='https://i.ibb.co/rRrxJsgr/new-logo.png' alt=''style='height:2.5rem;margin-left:auto;margin-right:auto' />
          </div>
          <div style='display:flex;border-radius:10px;padding:10px;height:max-content;'>
            <div class='container' style='background-color:white;margin-left:auto;margin-right:auto;border-radius:10px;padding:10px;height:max-content;'>
              <div style='text-align:center'>
                <img src='https://i.ibb.co/rRrxJsgr/new-logo.png'style='height:225px;' />
              </div>
              <div>
                <p>Hi <strong>Admin</strong></p>
                <p>Great news! <strong>${username},</strong> have a book a consultation on midwife. Visit the app for more information.</p>
              </div>
              <strong>Consultation Details,</strong>
              <p>Patient Name: ${username},</p>
              <p>Patient Email: ${customer_email},</p>
              <p>Notes: ${notes},</p>
              <p>Consultation Date: ${meetingDate},</p>
              <p>Consultation Time: ${meetingTime},</p>

              <div>
                <p>Best Regards,</p>
              </div>
              <div>
                <p>MidWife Team</p>
              </div>
                <div style='text-align: center;'>
                  <p style='color:#A3A9BB;font-size:0.7rem;'>© 2025 MidWife Analytics Inc. All rights reserved.</p>
                </div>
              </div>
      
             </div>
          </body>
        `
    },
}
