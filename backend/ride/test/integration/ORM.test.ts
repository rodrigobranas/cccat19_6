import Transaction from "../../src/domain/entity/Transaction";
import UUID from "../../src/domain/vo/UUID";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import Registry from "../../src/infra/di/Registry";
import ORM from "../../src/infra/orm/ORM";
import { TransactionModel } from "../../src/infra/orm/TransactionModel";

test("Deve inserir um registro no banco de dados", async function () {
    const connection = new PgPromiseAdapter();
    Registry.getInstance().provide("connection", connection);
    const orm = new ORM();
    const transaction = Transaction.create(UUID.create().getValue(), 100);
    await orm.save(TransactionModel.fromAggregate(transaction));
    const savedTransaction = await orm.get(TransactionModel, "transaction_id", transaction.getTransactionId());
    console.log(savedTransaction.toAggregate());
    expect(savedTransaction.amount).toBe(100);
    await connection.close();
});
