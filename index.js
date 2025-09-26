const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//Test Route
app.get("/", (req, res) => {
  res.send("Server is Running - - - - >>>>");
});

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.TRACKMATE_EMAIL,
    pass: process.env.TRACKMATE_EMAIL_PASS,
  },
});

// Email Route //
app.get("/send-payment-email", async (req, res) => {
  const paymentInfo = {
    transactionId: "6969696969",
    userEmail: "example@gmail.com", // recipient’s email
    userName: "Tomar Mon", // recipient’s name
    parcelInfo: "Momo",
  };

  const emailObj = {
    from: `"TrackMate Email Sender" ${process.env.TRACKMATE_EMAIL}`,
    to: paymentInfo.userEmail, // sending to actual email
    subject: "TrackMate Payment Confirmation",
    html: `<p>
        Hello ${paymentInfo.userName},
        <br/><br/>
        We’re happy to let you know that your payment was <b>successful</b>.
        <br/><br/>
        <b>Payment Details:</b><br/>
        Parcel: ${paymentInfo.parcelInfo}<br/>
        Transaction ID: ${paymentInfo.transactionId}<br/><br/>
        Thank you for choosing TrackMate. Your order is now being processed, you’ll receive further updates shortly.
        <br/><br/>
        If you have any questions, feel free to contact our support team at support@trackmate.com.
        <br/><br/>
        Best regards,<br/>
        The TrackMate Team
      </p>`,
  };

  try {
    const emailInfo = await emailTransporter.sendMail(emailObj);
    console.log("Email Sent", emailInfo.messageId);
    res.send({ result: "Success" });
  } catch (err) {
    console.log("Email Send Error", err);
    res.send({ result: "Email Failed" });
  }
});

console.log(process.env.TRACKMATE_EMAIL);
app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
