import amqp from "amqplib";

type Email = {
  from?: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
  attachments: string[];
};

const bootstrap = async () => {
  const connection = await amqp.connect(String(process.env.AMQP_URL));
  const channel = await connection.createChannel();

  await channel.assertExchange(
    String(process.env.EXCHANGE_NAME),
    String(process.env.EXCHANGE_TYPE),
    {
      durable: true,
    },
  );

  await channel.assertQueue(String(process.env.EMAIL_QUEUE), { durable: true });
  await channel.assertQueue(String(process.env.EMAILS_QUEUE), {
    durable: true,
  });
  await channel.bindQueue(
    String(process.env.EMAIL_QUEUE),
    String(process.env.EXCHANGE_NAME),
    "",
  );
  await channel.bindQueue(
    String(process.env.EMAILS_QUEUE),
    String(process.env.EXCHANGE_NAME),
    "",
  );

  return channel;
};

async function publishEmail(email: Email | Email[], interval: number = 500) {
  try {
    const channel = await bootstrap();

    if (!Array.isArray(email))
      return setInterval(() => {
        channel.sendToQueue(
          String(process.env.EMAIL_QUEUE),
          Buffer.from(JSON.stringify(email)),
          {
            persistent: true,
          },
        );
        console.log(
          `[x] Email published in the queue: ${process.env.EMAIL_QUEUE}.`,
        );
      }, interval);

    return setInterval(() => {
      channel.sendToQueue(
        String(process.env.EMAILS_QUEUE),
        Buffer.from(JSON.stringify(email)),
        {
          persistent: true,
        },
      );
      console.log(
        `[x] Emails published in the queue: ${process.env.EMAIL_QUEUE}.`,
      );
    }, interval);
  } catch (error) {
    console.error("[!] Error publishing message:", error);
  }
}

const emails = [
  {
    to: ["luizr726@gmail.com"],
    subject: "Titulo do texto 1",
    text: "Corpo do texto",
    html: "<h1>Corpo do texto</h1>",
    attachments: [],
  },
  {
    to: ["luizr726@gmail.com"],
    subject: "Titulo do texto 2",
    text: "Corpo do texto",
    html: "<h1>Corpo do texto</h1>",
    attachments: [],
  },
];

const email = {
  to: ["luizr726@gmail.com"],
  subject: "Titulo do texto",
  text: "Corpo do texto",
  html: "<h1>Corpo do texto</h1>",
  attachments: [],
};

publishEmail(emails, 10000);
publishEmail(email, 10000);
