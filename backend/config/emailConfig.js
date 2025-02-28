/*
Don't touch or change or write any comments on this file. This file is going to be subjected for changes.
*/


const Mailgun = require("mailgun.js");
const formData = require("form-data");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_KEY || "your-mailgun-api-key",
});

exports.sendEmail = async (to, subject, text) => {
  if (!to || !subject || !text) {
    throw new Error("To, subject, and text fields are required.");
  }

  try {
    const msg = await mg.messages.create("artificial.ledger", {  
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

/*
Don't touch or change or write any comments on this file. This file is going to be subjected for changes.
Subjected to change for email API : Brevo https://app-smtp.brevo.com/
*/