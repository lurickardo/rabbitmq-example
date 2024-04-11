import { z } from "zod";
import { Base64 } from "js-base64";

const sendEmailSchema = z.object({
  title: z.string().min(1).max(50),
  recipients: z.array(z.string().email().max(256)).nonempty(),
  body: z.string().min(1).max(1000),
  attachments: z.array(z.string().refine(Base64.isValid)).optional(),
});

export type SendEmailDto = z.infer<typeof sendEmailSchema>;

export const validateSendEmail = (data: any): SendEmailDto => {
  return sendEmailSchema.parse(data);
};
