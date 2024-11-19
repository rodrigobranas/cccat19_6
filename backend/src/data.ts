import pgp from "pg-promise";
import { GetAccountData } from "./GetAccount";
import { SignupData } from "./Signup";

// DAO - Data Access Object

export default interface AccountDAO extends SignupData, GetAccountData {
	saveAccount (account: any): Promise<any>;
	getAccountByEmail (email: string): Promise<any>;
	getAccountById (accountId: string): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO  {
	async getAccountByEmail (email: string) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [accountData] = await connection.query("select * from ccca.account where email = $1", [email]);
		await connection.$pool.end();
		if (!accountData) return;
		return {
			accountId: accountData.account_id,
			name: accountData.name,
			email: accountData.email,
			cpf: accountData.cpf,
			password: accountData.password,
			carPlate: accountData.car_plate,
			isPassenger: accountData.is_passenger,
			isDriver: accountData.is_driver
		};
	}
	
	async getAccountById (accountId: string) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [accountData] = await connection.query("select * from ccca.account where account_id = $1", [accountId]);
		await connection.$pool.end();
		return {
			accountId: accountData.account_id,
			name: accountData.name,
			email: accountData.email,
			cpf: accountData.cpf,
			password: accountData.password,
			carPlate: accountData.car_plate,
			isPassenger: accountData.is_passenger,
			isDriver: accountData.is_driver
		};
	}
	
	async saveAccount (account: any) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", [account.accountId, account.name, account.email, account.cpf, account.carPlate, !!account.isPassenger, !!account.isDriver, account.password]);
		await connection.$pool.end();
	}
}

export class AccountDAOMemory implements AccountDAO  {
	accounts: any[];

	constructor () {
		this.accounts = [];
	}

	async getAccountByEmail (email: string) {
		return this.accounts.find((account: any) => account.email === email);
	}
	
	async getAccountById (accountId: string) {
		return this.accounts.find((account: any) => account.accountId === accountId);
	}
	
	async saveAccount (account: any) {
		this.accounts.push(account);
	}
}
