import HttpClient from "../http/HttpClient";

export default interface AccountGateway {
    signup (input: SignupInput): Promise<any>;
    getAccountById (accountId: string): Promise<GetAccountByIdOutput>;
}

export class AccountGatewayHttp implements AccountGateway {

    constructor (readonly httpClient: HttpClient) {
    }
    
    async signup(input: any): Promise<any> {
        return this.httpClient.post("http://localhost:3000/signup", input);
    }

    async getAccountById(accountId: string): Promise<any> {
        return this.httpClient.get(`http://localhost:3000/accounts/${accountId}`);
    }

}

type SignupInput = {
	name: string,
	email: string,
	cpf: string,
	password: string,
	carPlate?: string,
	isPassenger?: boolean,
	isDriver?: boolean
}

type GetAccountByIdOutput = {
    accountId: string,
	name: string,
	email: string,
	cpf: string,
	password: string,
	carPlate?: string,
	isPassenger?: boolean,
	isDriver?: boolean
}