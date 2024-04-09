import amqp from "amqplib";

async function publishMessage(
	exchangeName: string,
	queueName: string,
	message: any,
) {
	try {
		const connection = await amqp.connect(String(process.env.AMQP_URL));
		const channel = await connection.createChannel();

		await channel.assertExchange(exchangeName, "direct", { durable: true });
		await channel.assertQueue(queueName, { durable: true });
		await channel.bindQueue(queueName, exchangeName, "direct");

		setInterval(() => {
			channel.publish(exchangeName, "", Buffer.from(JSON.stringify(message)), {
				persistent: true,
			});
			console.log(
				`[x] Mensagem publicada na exchange ${exchangeName}.`,
			);
		}, 500);
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

publishMessage(exchangeName, queueName, messages);
