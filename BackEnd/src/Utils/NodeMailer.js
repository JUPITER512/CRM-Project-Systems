import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_APP_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendmail({
  email,
  code = null,
  subject,
  verificationLinkcode = null,
}) {
  let mailOptions;
  if (code) {
    mailOptions = {
      from: "syedalimurtaza36@gmail.com",
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Your OTP Code</h2>
          <p>Dear User,</p>
          <p>Thank you for using our CRM suite. Your OTP code is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #ff5722;">${code}</p>
          <p>Please enter this code to proceed. If you did not request this code, please ignore this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The CRM Suite Team</p>
        </div>
      `,
    };
  } else if (verificationLinkcode) {
    mailOptions = {
      from: "syedalimurtaza36@gmail.com",
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Verify Your Email Address</h2>
          <p>Dear User,</p>
          <p>Thank you for using our CRM suite. Please click the link below to verify your email address:</p>
          <a href="http://localhost:3000/api/email-verification/${verificationLinkcode}" style="font-size: 18px; color: #ff5722;">Verify Email</a>
          <p>If you did not create an account, please ignore this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The CRM Suite Team</p>
        </div>
      `,
    };
  } else {
    console.error("Either OTP code or verification link must be provided.");
    return;
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error.message);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
