import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,  
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendAppointmentMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"Jardinería Ornamental" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};
