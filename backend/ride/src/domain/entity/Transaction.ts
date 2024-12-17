import UUID from "../vo/UUID";

export default class Transaction {
    private transactionId: UUID;
    private rideId: UUID;

    constructor (transactionId: string, rideId: string, readonly amount: number, readonly status: string, readonly date: Date) {
        this.transactionId = new UUID(transactionId);
        this.rideId = new UUID(rideId);
    }

    static create (rideId: string, amount: number) {
        const transactionId = UUID.create().getValue();
        const status = "waiting_payment";
        const date = new Date();
        return new Transaction(transactionId, rideId, amount, status, date);
    }

    getTransactionId () {
        return this.transactionId.getValue();
    }

    getRideId () {
        return this.rideId.getValue();
    }
}
