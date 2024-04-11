import { z } from "zod";
import { Base64 } from "js-base64";

const sendEmailsSchema = z
  .array(
    z.object({
      title: z.string().min(1).max(50),
      recipients: z.array(z.string().email().max(256)).nonempty(),
      body: z.string().min(1).max(1000),
      attachments: z.array(z.string().refine(Base64.isValid)).optional(),
    }),
  )
  .nonempty();

export type SendEmailsDto = z.infer<typeof sendEmailsSchema>;

export const validateSendEmails = (data: any): SendEmailsDto => {
  return sendEmailsSchema.parse(data);
};
