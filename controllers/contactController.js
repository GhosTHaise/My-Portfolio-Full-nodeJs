const config = require('../config');

const contactView = (req,res) =>{
    res.render("contact",{

    })
}
const formal_content = (text_normalized,contact) =>{
  let header = "<h4 style='color:#7b7b7b;margin-bottom:15px;'>Cher GhosT,</h4>";
  let send_contact = "<p>Vous pouvez me contacter par </p>"+contact
  return header + text_normalized + send_contact;
}
const Send_Email_TO_GhosT = async(from_send,subject_send,body_send) => {
    "use strict";
    const nodemailer = require("nodemailer");
    
    // async..await is not allowed in global scope, must use a wrapper
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service : 'gmail',
        //host: "smtp.ethereal.email",
        //port: 587,
        //secure: false, // true for 465, false for other ports
        auth: {
          user: config.gmail, // generated ethereal user
          pass: config.secret, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: from_send, // sender address
        to: config.gmail, // list of receivers
        subject: subject_send, // Subject line
        text: body_send, // plain text body
        html: "<b>"+formal_content(body_send,from_send)+"</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
}

const SendMail = async (req,res) => {
    //console.log(req.body);
    const request = req.body;
    const request_subject = request.name_sender + " voudrait vous contacter ."; 
    await Send_Email_TO_GhosT(request.email_sender,request_subject,request.message_sender) 
}
module.exports = {
    contactView,
    SendMail
}

