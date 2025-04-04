import nodemailer from "nodemailer";
import { ENV } from "../config/env";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  attachments?: any[]
) => {
  return transporter.sendMail({
    from: ENV.EMAIL_FROM,
    to,
    subject,
    html,
    attachments,
  });
};
