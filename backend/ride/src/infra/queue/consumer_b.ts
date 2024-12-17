import amqp from "amqplib";

(async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    channel.consume("rideCompleted.generateInvoice", function (message: any) {
        const input = JSON.parse(message.content.toString());
        console.log("rideCompleted.generateInvoice", input);
        channel.ack(message);
    });
})();
