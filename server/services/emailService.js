import { transporter } from "../config/mailer.js";

export const sendEmail = async (to, subject, message) => {
  try {
    await transporter.sendMail({
      from: `"RupeeLending" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message
    });
    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send email", error);
    throw new Error("Failed to send email");
  }
};
