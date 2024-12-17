import Transaction from "../../domain/entity/Transaction";
import Registry, { inject } from "../../infra/di/Registry";
import RideRepository from "../../infra/repository/RideRepository";
import TransactionRepository from "../../infra/repository/TransactionRepository";

export default class ProcessPayment {
    @inject("rideRepository")
    rideRepository!: RideRepository;
    @inject("transactionRepository")
    transactionRepository!: TransactionRepository;

    constructor () {
    }

    async execute (input: Input): Promise<Output> {
        console.log("processPayment");
        let amount;
        if (!input.amount) {
            const ride = await this.rideRepository.getRideById(input.rideId);
            amount = ride.getFare();
        } else {
            amount = input.amount;
        }
        const transaction = Transaction.create(input.rideId, amount);
        await this.transactionRepository.saveTransaction(transaction);
        return {
            transactionId: transaction.getTransactionId()
        }
    }
}

type Input = {
    rideId: string,
    amount?: number
}

type Output = {
    transactionId: string
}
