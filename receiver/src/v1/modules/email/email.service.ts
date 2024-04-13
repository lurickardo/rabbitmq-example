import { SendEmailDto } from "./dto/sendEmail.dto";
import { sendMail } from "../../../providers/nodemailer.provider";

export const emailService = {
  sendEmail: async (sendEmailDto: SendEmailDto) => {
    if (!Array.isArray(sendEmailDto)) {
      await sendMail(sendEmailDto);
      console.info("Sending email successfully!");
      return;
    }
    await Promise.all(
        sendEmailDto.map(
          async (emailDto) => await sendMail(emailDto),
        ),
      );
    console.info("Sending emails successfully!");
    return;
  },
};
