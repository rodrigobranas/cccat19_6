import amqp from "amqplib";

(async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    channel.consume("rideCompleted.processPayment", function (message: any) {
        const input = JSON.parse(message.content.toString());
        console.log("rideCompleted.processPayment", input);
        channel.ack(message);
    });
})();
