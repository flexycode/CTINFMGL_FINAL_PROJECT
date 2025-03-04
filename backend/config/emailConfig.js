const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_KEY
  }
});

exports.sendEmail = async (to, subject, text) => {
  if (!to || !subject || !text) {
    throw new Error("To, subject, and text fields are required.");
  }

  try {
    const msg = await transporter.sendMail({
      from: "flexycode.dev@gmail.com",
      to, 
      subject,
      text,
      html: `<div style="color:red">${text}</div>`,
    });
    console.log("Email sent successfully:", msg);
    return msg;  
  } catch (err) {
    console.error("Error occurred while sending email:", err);
    throw new Error("An error occurred while sending the email.");
  }
};