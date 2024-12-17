const nodemailer = require("nodemailer");

const sendEmail = async (payload) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: `"${payload.fromName}" <${payload.from}>`,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      };
  
      var result = await transporter.sendMail(mailOptions);
      console.log(result);
      return {
        status: 200,
        message: payload.successMessage,
      };
    } catch (error) {
      console.error("Error sending email:", error.message);
      return {
        status: 500,
        message: "فشل في إرسال البريد الإلكتروني",
      };
    }
  };
  
  module.exports = {
    sendEmail,
  };
  