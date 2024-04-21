import User from "@/DB/Model/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const { username } = await User.findById(userId);
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hasedToken,
          verifyTokenExpiry: Date.now() + 3600000
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hasedToken,
          forgotPasswordExpiry: Date.now() + 3600000
        }
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "dataskillshub@gmail.com",
        pass: "izna vxhf rchg gksl"
      }
    });
    const mailOptions = {
      from: "dataskillshub@gmail.com", // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
      html:
        emailType === "VERIFY"
          ? ` <p>
          Hello ${username},
          <br />
          <br />
          Thank you for signing up with Data Skills Hub! 
<br />
Kindly click the link below  link to verify your email address
<br />
      Click <a href=${process.env.DOMAIN}/verifyemail?token=${hasedToken}>here</a>


      <br />
   If you have any questions or need assistance, feel free to contact us at support@dataskillshub.com
<br />
<br />
<br />
Thank you,
<br />
Data Skills Hub
    </p>`
          : ` <p>Hello ${username},
          <br />

          <br />
We received a request to reset the password for your account at Data Skills Hub. To reset your password, please click the link below:
<br />
      Click <a class="text-2xl" href=${
        process.env.DOMAIN
      }/resetpassword?token=${hasedToken}>here</a>
      <br />
      to ${emailType === "RESET" ? "reset" : "verify"} your password
      <br />
      If you didn't request this change, you can safely ignore this email. Your password will remain unchanged.

      <br />
If you need further assistance or have any questions, feel free to contact us at support@dataskillshub.com
<br />
<br />
<br />
Thank you,
<br />
Data Skills Hub

    </p>`
    };
    const mailResponse = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};
