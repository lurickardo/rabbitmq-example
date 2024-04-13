import { env } from "../../../config";
import { Queue } from "../../../@types/Queue";
import { validateSendEmail } from "./dto";
import { emailService } from "./email.service";

export const emailQueues: Queue[] = [
  {
    name: env.channel.queues.emailQueue,
    service: emailService.sendEmail,
    validate: validateSendEmail,
    options: { durable: true },
  },
];
