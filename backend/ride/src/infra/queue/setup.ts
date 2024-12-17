import amqp from "amqplib";

(async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertExchange("rideCompleted", "direct", { durable: true });
    await channel.assertQueue("rideCompleted.processPayment", { durable: true });
    await channel.assertQueue("rideCompleted.generateInvoice", { durable: true });
    await channel.bindQueue("rideCompleted.processPayment", "rideCompleted", "");
    await channel.bindQueue("rideCompleted.generateInvoice", "rideCompleted", "");
})();
