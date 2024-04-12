import * as amqp from "amqplib";
import * as fs from "node:fs";
import * as path from "node:path";
import * as mime from "mime-types";

const contentType = (filename: string) => {
  const extension = filename.split(".").pop();
  return mime.lookup(extension);
};

const convertFile = (
  {
    file,
    baseEncoding = "utf-8",
  }: { file: string; baseEncoding?: BufferEncoding },
  targetEncoding: BufferEncoding,
) => {
  try {
    const readFile = fs.readFileSync(path.resolve(__dirname, file), {
      encoding: baseEncoding,
    });

    return Buffer.from(readFile).toString(targetEncoding);
  } catch (error) {
    console.error("Arquivo não encontrado");
    return null;
  }
};

type Email = {
  from?: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
  attachments: { filename: string; content: string; contentType: string }[];
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

  console.log(`[✔ ] : Server amqp connected.`);
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

const attachments = fs.readdirSync("attachments").map((attachment) => {
  return {
    filename: attachment,
    content: convertFile({ file: `attachments/${attachment}` }, "base64"),
    contentType: contentType(attachment) || "text/plain",
  };
});

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
  attachments: attachments,
};

publishEmail(emails, 2500);
publishEmail(email, 2500);
