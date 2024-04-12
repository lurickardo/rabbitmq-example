import { z } from "zod";
import { Base64 } from "js-base64";

const sendEmailSchema = z.object({
  from: z.string().email().max(256).optional(),
  to: z.array(z.string().email().max(256)).nonempty(),
  subject: z.string().min(1).max(50),
  text: z.string().min(1).max(1000).optional(),
  html: z.string().min(1).optional(),
  attachments: z.array(z.string().refine(Base64.isValid)).optional(),
});

export type SendEmailDto = z.infer<typeof sendEmailSchema>;

export const validateSendEmail = (data: any): SendEmailDto => {
  return sendEmailSchema.parse(data);
};
