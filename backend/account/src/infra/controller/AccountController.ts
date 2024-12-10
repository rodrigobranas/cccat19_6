import GetAccount from "../../application/usecase/GetAccount";
import HttpServer from "../http/HttpServer";
import Signup from "../../application/usecase/Signup";

// Interface Adapter

export default class AccountController {

    constructor (readonly httpServer: HttpServer, readonly signup: Signup, readonly getAccount: GetAccount) {
        httpServer.register("post", "/signup", async (params: any, body: any) => {
            const output = await signup.execute(body);
            return output;
        });
        
        httpServer.register("get", "/accounts/:{accountId}", async (params: any, body: any) => {
            const output = await getAccount.execute(params.accountId);
            return output;
        });
    }
}
