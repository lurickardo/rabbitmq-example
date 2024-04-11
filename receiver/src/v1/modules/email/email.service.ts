import { SendEmailsDto } from "./dto/sendEmails.dto";
import { SendEmailDto } from "./dto/sendEmail.dto";

export const emailService = {
  sendEmail: async (sendEmailDto: SendEmailDto) => {
    console.info(sendEmailDto);
    console.info("Sending email successfully!");
  },
  sendEmails: async (sendEmailsDto: SendEmailsDto) => {
    console.info(sendEmailsDto);
    console.info("Sending emails successfully!");
  },
};
