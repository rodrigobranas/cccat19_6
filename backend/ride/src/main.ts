import ProcessPayment from "./application/usecase/ProcessPayment";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import Registry from "./infra/di/Registry";
import ORM from "./infra/orm/ORM";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import { RideRepositoryDatabase } from "./infra/repository/RideRepository";
import { TransactionRepositoryDatabase } from "./infra/repository/TransactionRepository";

// Entry Point - Composition Root

(async () => {
    const queue = new RabbitMQAdapter();
    await queue.connect();
    Registry.getInstance().provide("queue", queue);
    Registry.getInstance().provide("connection", new PgPromiseAdapter());
    Registry.getInstance().provide("orm", new ORM());
    Registry.getInstance().provide("transactionRepository", new TransactionRepositoryDatabase());
    Registry.getInstance().provide("rideRepository", new RideRepositoryDatabase());
    Registry.getInstance().provide("processPayment", new ProcessPayment());
    queue.consume("rideCompleted.processPayment", async function (data: any) {
        await Registry.getInstance().inject("processPayment").execute(data);
    });
})();
