import User from "@/DB/Model/userModel";
import nodemailer from "nodemailer";

export const sendEmail = async ({ userId }) => {
  try {
    const userData = await User.findById(userId);
    const couponCode = userData.coupenCode;
    const username = userData.username;
    const course = userData.courses;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "dataskillshub@gmail.com",
        pass: "izna vxhf rchg gksl"
      }
    });

    // Determine the recipient email based on the coupon code
    let toEmail; // Default email
    let name;
    if (couponCode === "") {
      console.log("Coupen code is empty");
    } else if (couponCode === "dataskills70") {
      name = "prayagraj";
      toEmail = "sureshkhetani1111@gmail.com";
    } else if (couponCode === "prayag80") {
      name = "prayagraj";
      toEmail = "meetkhetani1111@gmail.com";
    }

    const mailOptions = {
      from: "dataskillshub@gmail.com",
      to: toEmail,
      subject: "Payment Success", // Provide a subject string
      html: `<p>hello ${name}, </p>
      <p>${username} has just used your coupon ${couponCode} on ${course} course </p> 
      <p>Best Regards,
      <br />
Data Skills Hub </p>
      `
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent:", mailResponse);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error(error.message);
  }
};
