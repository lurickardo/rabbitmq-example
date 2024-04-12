import nodemailer, { SendMailOptions } from "nodemailer";
import { env } from "../config";

type SendEmail = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
};

const transporter = nodemailer.createTransport({
  host: env.smtpEmail.host,
  port: env.smtpEmail.port,
  secure: env.smtpEmail.secure,
  auth: {
    user: env.smtpEmail.auth.user,
    pass: env.smtpEmail.auth.pass,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async ({
  from = env.smtpEmail.defaultEmailFrom,
  to,
  subject,
  text,
  html,
  attachments,
}: SendMailOptions): Promise<string> => {
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
  });

  return info.messageId;
};
