import * as nodemailer from "nodemailer";
import { env } from "../config";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

const transporter = nodemailer.createTransport({
  host: env.smtpEmail.host,
  port: env.smtpEmail.port,
  secure: env.smtpEmail.secure,
  auth: {
    user: env.smtpEmail.auth.user,
    pass: env.smtpEmail.auth.pass,
  },
});

export const sendMail = async ({
  from = env.smtpEmail.defaultEmailFrom,
  to,
  subject,
  text,
  html,
  attachments,
}: MailOptions): Promise<void> => {
  try {
    const response = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      attachments,
    });

    console.info(response.messageId);
  } catch (error) {
    console.error("[!] Error nodemailer - sendMail:", error);
  }
};
