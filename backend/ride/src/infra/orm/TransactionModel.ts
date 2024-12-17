import Transaction from "../../domain/entity/Transaction";
import { Model, model, column } from "./ORM";

@model("ccca", "transaction")
export class TransactionModel extends Model {
    @column("transaction_id")
    transactionId: string;
    @column("ride_id")
    rideId: string;
    @column("amount", "number")
    amount: number;
    @column("status")
    status: string;
    @column("date")
    date: Date;

    constructor (transactionId: string, rideId: string, amount: number, status: string, date: Date) {
        super();
        this.transactionId = transactionId;
        this.rideId = rideId;
        this.amount = amount;
        this.status = status;
        this.date = date;
    }

    static fromAggregate (transaction: Transaction) {
        return new TransactionModel(transaction.getTransactionId(), transaction.getRideId(), transaction.amount, transaction.status, transaction.date);
    }

    toAggregate () {
        return new Transaction(this.transactionId, this.rideId, this.amount, this.status, this.date);
    }
}
