import amqp from "amqplib";
import UUID from "../../domain/vo/UUID";

(async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const input = {
        rideId: UUID.create().getValue()
    }
    channel.publish("rideCompleted", "", Buffer.from(JSON.stringify(input)));
    setTimeout(async () => {
        await connection.close();
    }, 400);
})();
