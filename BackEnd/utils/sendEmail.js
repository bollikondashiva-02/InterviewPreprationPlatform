const nodemailer = require("nodemailer");

const sendEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

const verificationUrl =
`${API}/api/auth/verify/${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "PrepConnect Email Verification",
      html: `
        <h2>Welcome to PrepConnect 🚀</h2>
        <p>Click the button below to verify your email:</p>

        <a href="${verificationUrl}"
        style="
        display:inline-block;
        background:#2563eb;
        color:white;
        padding:12px 25px;
       text-decoration:none;
       border-radius:6px;
        font-weight:bold;
        ">
        Verify Email
        </a>

        <p>If you didn't create this account, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Verification email sent ✅");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;