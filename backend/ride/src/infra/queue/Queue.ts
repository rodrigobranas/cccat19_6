import amqp from "amqplib";

export default interface Queue {
    connect (): Promise<void>;
    publish (event: string, input: any): Promise<void>;
    consume (event: string, callback: Function): Promise<void>;
}

export class RabbitMQAdapter implements Queue {
    connection: any;

    constructor () {
    }

    async connect(): Promise<void> {
        this.connection = await amqp.connect("amqp://localhost");
    }

    async publish(event: string, input: any): Promise<void> {
        const channel = await this.connection.createChannel();
        channel.publish(event, "", Buffer.from(JSON.stringify(input)));
    }

    async consume(event: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        channel.consume(event, async (message: any) => {
            const input = JSON.parse(message.content.toString());
            await callback(input);
            channel.ack(message);
        });
    }

}
