import { env } from "../../../config";
import { Queue } from "../../../@types/Queue";
import { validateSendEmail, validateSendEmails } from "./dto";
import { emailService } from "./email.service";

export const emailQueues: Queue[] = [
  {
    name: env.channel.queues.emailQueue,
    service: emailService.sendEmail,
    validate: validateSendEmail,
    options: { durable: true },
  },
  {
    name: env.channel.queues.emailsQueue,
    service: emailService.sendEmails,
    validate: validateSendEmails,
    options: { durable: true },
  },
];
