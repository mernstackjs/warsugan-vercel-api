const nodemailer = require("nodemailer");

const transport = new nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILEMAIL,
    pass: process.env.NODEMAILPASS,
  },
});

exports.sendMail = async (to, subject, html) => {
  const emailOption = {
    from: process.env.NODEMAILEMAIL,
    to,
    subject,
    html,
  };

  try {
    const info = await transport.sendMail(emailOption);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
