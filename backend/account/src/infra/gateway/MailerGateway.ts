export default interface MailerGateway {
    send (receipient: string, subject: string, message: string): Promise<void>;
}

export class MailerGatewayMemory implements MailerGateway {
    
    async send(receipient: string, subject: string, message: string): Promise<void> {
        console.log("send", receipient, subject, message);
    }

}
