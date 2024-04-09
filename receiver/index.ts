import amqp from "amqplib";

async function receiveMessage(queueName: string, exchangeName: string) {
	try {
		const connection = await amqp.connect(String(process.env.AMQP_URL));
		const channel = await connection.createChannel();

		await channel.assertExchange(exchangeName, "direct", { durable: true });
		await channel.assertQueue(queueName, { durable: true });
		await channel.bindQueue(queueName, exchangeName, "");

		console.log(
			`[*] Aguardando mensagens na fila...`,
		);

		channel.consume(
			queueName,
			(message: any) => {
				console.log(
					`[x] Mensagem recebida na fila ${queueName} da exchange ${exchangeName}: ${message.content.toString()}`,
				);
			},
			{ noAck: true },
		); // Não enviar confirmação de recebimento (ACK)
	} catch (error) {
		console.error("[!] Ocorreu um erro ao receber a mensagem:", error);
	}
}

const exchangeName = String(process.env.EMAIL_EXCHANGE_NAME);
const queueName = String(process.env.EMAIL_QUEUE_NAME);

receiveMessage(queueName, exchangeName);
