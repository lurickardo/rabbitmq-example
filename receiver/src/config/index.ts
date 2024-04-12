type Env = {
  app: { amqpUrl: string; environment: string };
  smtpEmail: {
    host: string;
    port: number;
    secure: boolean;
    auth: { user: string; pass: string };
    defaultEmailFrom: string;
  };
  channel: {
    exchange: { name: string; type: string };
    queues: { emailQueue: string; emailsQueue: string };
  };
};

export const env = Object.freeze({
  app: {
    amqpUrl: process.env.AMQP_URL,
    environment: process.env.APP_ENVIRONMENT,
  },
  smtpEmail: {
    host: process.env.SMTP_EMAIL_HOST,
    port: Number(process.env.SMTP_EMAIL_PORT),
    secure: Boolean(process.env.SMTP_EMAIL_SECURE),
    auth: {
      user: process.env.SMTP_EMAIL_AUTH_USER,
      pass: process.env.SMTP_EMAIL_AUTH_PASS,
    },
    defaultEmailFrom: process.env.DEFAULT_EMAIL_FROM,
  },
  channel: {
    exchange: {
      name: process.env.EXCHANGE_NAME,
      type: process.env.EXCHANGE_TYPE,
    },
    queues: {
      emailQueue: process.env.EMAIL_QUEUE,
      emailsQueue: process.env.EMAILS_QUEUE,
    },
  },
} as Env);
