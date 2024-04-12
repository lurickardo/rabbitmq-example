import { SendEmailsDto } from "./dto/sendEmails.dto";
import { SendEmailDto } from "./dto/sendEmail.dto";
import { sendMail } from "../../../providers/nodemailer.provider";

export const emailService = {
  sendEmail: async (sendEmailDto: SendEmailDto) => {
    await sendMail(sendEmailDto);
    console.info("Sending email successfully!");
  },
  sendEmails: async (sendEmailsDto: SendEmailsDto) => {
    await Promise.all(
      sendEmailsDto.map(
        async (sendEmailDto: SendEmailDto) => await sendMail(sendEmailDto),
      ),
    );
    console.info("Sending emails successfully!");
  },
};
