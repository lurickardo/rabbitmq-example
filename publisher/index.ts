import amqp from "amqplib";

async function publishMessage(
  exchangeName: string,
  queueName: string,
  message: any,
  interval: number = 500,
) {
  try {
    const connection = await amqp.connect(String(process.env.AMQP_URL));
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, "direct", { durable: true });

    setInterval(() => {
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
      });
      console.log(`[x] Mensagem publicada na exchange ${exchangeName}.`);
    }, interval);
  } catch (error) {
    console.error("[!] Ocorreu um erro ao publicar a mensagem:", error);
  }
}

const exchangeName = String(process.env.EMAIL_EXCHANGE_NAME);
const queueName = String(process.env.EMAIL_QUEUE_NAME);
const messages = {
  notifications: [
    {
      title: "Titulo do texto",
      recipients: ["luizr726@gmail.com"],
      body: "Corpo do texto",
      attachments: [],
    },
  ],
};

publishMessage(exchangeName, queueName, messages, 500);

const message = {
  title: "Titulo do texto",
  recipients: ["luizr726@gmail.com"],
  body: "Corpo do texto",
  attachments: [],
};
publishMessage(exchangeName, "notification", message, 250);
