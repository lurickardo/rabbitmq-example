import { z } from "zod";
import { Base64 } from "js-base64";

const emailSchema = z.object({
  from: z.string().email().max(256).optional(),
  to: z.array(z.string().email().max(256)).nonempty(),
  subject: z.string().min(1).max(50),
  text: z.string().min(1).max(1000).optional(),
  html: z.string().min(1).optional(),
  attachments: z
    .array(
      z.object({
        filename: z.string().min(1),
        content: z.string().refine(Base64.isValid),
        encoding: z.string().optional().default("base64"),
        contentType: z.string().default("text/plain"),
      }),
    )
    .optional(),
});

const sendEmailSchema = z.union([emailSchema, z.array(emailSchema).nonempty()]);

export type SendEmailDto = z.infer<typeof sendEmailSchema>;

export const validateSendEmail = (data: any): SendEmailDto => {
  return sendEmailSchema.parse(data);
};
