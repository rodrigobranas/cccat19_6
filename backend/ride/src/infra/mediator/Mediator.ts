export default class Mediator {
    handlers: { event: string, callback: Function }[];

    constructor () {
        this.handlers = [];
    }

    register (event: string, callback: Function) {
        this.handlers.push({ event, callback });
    }

    async notifyAll (event: any) {
        for (const handler of this.handlers) {
            if (handler.event === event.event) {
                await handler.callback(event);
            }
        }
    }
}
