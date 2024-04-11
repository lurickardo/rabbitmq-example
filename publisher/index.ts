import amqp from "amqplib";

type Email = {
  title: string;
  recipients: string[];
  body: string;
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
    title: "Titulo do email 1",
    recipients: ["luizr726@gmail.com"],
    body: "Corpo do email 2",
    attachments: [],
  },
  {
    title: "Titulo do email 2",
    recipients: ["luizr726@gmail.com"],
    body: "Corpo do email 2",
    attachments: [],
  },
];

const email = {
  title: "Titulo do texto",
  recipients: ["luizr726@gmail.com"],
  body: "Corpo do texto",
  attachments: [],
};

publishEmail(emails, 1000);
publishEmail(email, 1000);
