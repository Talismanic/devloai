const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(email, token) {
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `
        <h1>Email Verification</h1>
        <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    };
    
    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();