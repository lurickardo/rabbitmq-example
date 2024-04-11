type Env = {
  app: { amqpUrl: string; environment: string };
  database: { name: string; url: string };
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
  database: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
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
