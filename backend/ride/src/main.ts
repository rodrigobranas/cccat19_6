import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter, HapiAdapter } from "./infra/http/HttpServer";

// Entry Point - Composition Root

const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();
const connection = new PgPromiseAdapter();
httpServer.listen(3000);
