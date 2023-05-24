import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter using a testing account
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
  } 
});

// Middleware function to send emails
export const sendEmail = async (req, res) => {
  const { userEmail, username, text, subject} = req.body;

  // Create a Mailgen instance
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      title: "Career & Degree Counselling",
      name: "Career & Degree Counselling",
      link: "http://pkdservers.com/cdc/",
      logo: "https://res.cloudinary.com/dzsvm3vvp/image/upload/v1679311060/logo_zuk0lu.png",
      logoHeight: '120px'
    },
  });

  // Prepare email content
  const email = {
    body: {
      name: username,
      intro: "Welcome to Your App! We're excited to have you on board.",
      action: {
        instructions: "To get started with Your App, please click here:",
        button: {
          color: "#22BC66",
          text: "Confirm your email",
          link: "http://pkdservers.com/cdc/",
        },
      },
      outro: "If you have any questions, feel free to reach out to us.",
    },
  };

  // Generate the HTML email using Mailgen
  const emailBody = mailGenerator.generate(email);

  // Email options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: subject ||  "Verify Your Email",
    html: emailBody,
  };

  // Send email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send({error: error.message });
      // You can handle the error as needed
    } else {
      res.status(200).send({message: "You Should receive an email"});
      // You can handle the successful email send as needed
    }
  });
};