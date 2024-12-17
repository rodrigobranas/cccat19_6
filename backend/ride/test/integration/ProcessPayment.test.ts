import GetTransaction from "../../src/application/usecase/GetTransaction";
import ProcessPayment from "../../src/application/usecase/ProcessPayment";
import UUID from "../../src/domain/vo/UUID";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import Registry from "../../src/infra/di/Registry";
import ORM from "../../src/infra/orm/ORM";
import { RideRepositoryDatabase } from "../../src/infra/repository/RideRepository";
import { TransactionRepositoryDatabase } from "../../src/infra/repository/TransactionRepository";

test("Deve processar o pagamento", async function () {
    const connection = new PgPromiseAdapter();
    Registry.getInstance().provide("connection", connection);
    Registry.getInstance().provide("orm", new ORM());
    Registry.getInstance().provide("rideRepository", new RideRepositoryDatabase());
    Registry.getInstance().provide("transactionRepository", new TransactionRepositoryDatabase());
    const processPayment = new ProcessPayment();
    const getTransaction = new GetTransaction();
    const inputProcessPayment = {
        rideId: UUID.create().getValue(),
        amount: 100
    }
    const outputProcessPayment = await processPayment.execute(inputProcessPayment);
    const outputGetTransaction = await getTransaction.execute(outputProcessPayment.transactionId);
    expect(outputGetTransaction.rideId).toBe(inputProcessPayment.rideId);
    expect(outputGetTransaction.amount).toBe(inputProcessPayment.amount);
    await connection.close();
});
