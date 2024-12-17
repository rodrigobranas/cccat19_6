import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import { RideRepositoryDatabase } from "../../src/infra/repository/RideRepository";
import sinon from "sinon";
import AcceptRide from "../../src/application/usecase/AcceptRide";
import StartRide from "../../src/application/usecase/StartRide";
import { PositionRepositoryDatabase } from "../../src/infra/repository/PositionRepository";
import AccountGateway, { AccountGatewayHttp } from "../../src/infra/gateway/AccountGateway";
import { AxiosAdapter } from "../../src/infra/http/HttpClient";
import UpdatePosition from "../../src/application/usecase/UpdatePosition";
import FinishRide from "../../src/application/usecase/FinishRide";
import ProcessPayment from "../../src/application/usecase/ProcessPayment";
import Registry from "../../src/infra/di/Registry";
import ORM from "../../src/infra/orm/ORM";
import { TransactionRepositoryDatabase } from "../../src/infra/repository/TransactionRepository";

let connection: DatabaseConnection;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let startRide: StartRide;
let updatePosition: UpdatePosition;
let accountGateway: AccountGateway;
let finishRide: FinishRide;

beforeEach(async () => {
    Registry.getInstance().provide("httpClient", new AxiosAdapter());
    connection = new PgPromiseAdapter();
    Registry.getInstance().provide("connection", connection);
    accountGateway = new AccountGatewayHttp();
    Registry.getInstance().provide("accountGateway", accountGateway);
    Registry.getInstance().provide("orm", new ORM());
    Registry.getInstance().provide("transactionRepository", new TransactionRepositoryDatabase());
    Registry.getInstance().provide("rideRepository", new RideRepositoryDatabase());
    Registry.getInstance().provide("positionRepository", new PositionRepositoryDatabase());
    Registry.getInstance().provide("processPayment", new ProcessPayment());
    requestRide = new RequestRide();
    acceptRide = new AcceptRide();
    startRide = new StartRide();
    updatePosition = new UpdatePosition();
    finishRide = new FinishRide();
    getRide = new GetRide();
});

test("Deve iniciar uma corrida", async function () {
    const inputSignupPassenger = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    }
    const outputSignupPassenger = await accountGateway.signup(inputSignupPassenger);
    const inputSignupDriver = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        carPlate: "AAA9999",
        isDriver: true
    }
    const outputSignupDriver = await accountGateway.signup(inputSignupDriver);
    const inputRequestRide = {
        passengerId: outputSignupPassenger.accountId,
        fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
    }
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputAcceptRide = {
        rideId: outputRequestRide.rideId,
        driverId: outputSignupDriver.accountId
    }
    await acceptRide.execute(inputAcceptRide);
    const inputStartRide = {
        rideId: outputRequestRide.rideId
    }
    await startRide.execute(inputStartRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.status).toBe("in_progress");
});

afterEach(async () => {
    await connection.close();
});
