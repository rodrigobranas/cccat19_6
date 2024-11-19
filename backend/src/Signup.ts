import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import AccountDAO from "./data";
import MailerGateway from "./MailerGateway";

export default class Signup {
	// DIP - Dependency Inversion Principle
	constructor (readonly accountDAO: AccountDAO, readonly mailerGateway: MailerGateway) {
	}

	isValidName (name: string) {
		return name.match(/[a-zA-Z] [a-zA-Z]+/);
	}
	
	isValidEmail (email: string) {
		return email.match(/^(.+)@(.+)$/);
	}
	
	isValidCarPlate (carPlate: string) {
		return carPlate.match(/[A-Z]{3}[0-9]{4}/)
	}
	
	async signup (input: any) {
		const account = {
			accountId: crypto.randomUUID(),
			name: input.name,
			email: input.email,
			cpf: input.cpf,
			password: input.password,
			carPlate: input.carPlate,
			isPassenger: input.isPassenger,
			isDriver: input.isDriver
		}
		const existingAccount = await this.accountDAO.getAccountByEmail(account.email);
		if (existingAccount) throw new Error("Duplicated account");
		if (!this.isValidName(account.name)) throw new Error("Invalid name");
		if (!this.isValidEmail(account.email)) throw new Error("Invalid email");
		if (!validateCpf(account.cpf)) throw new Error("Invalid cpf");
		if (account.isDriver && !this.isValidCarPlate(account.carPlate)) throw new Error("Invalid car plate");
		await this.accountDAO.saveAccount(account);
		await this.mailerGateway.send(account.email, "Welcome", "...");
		return {
			accountId: account.accountId
		}
	}
}

// ISP - Interface Segregation Principle
export interface SignupData {
	saveAccount (account: any): Promise<any>;
	getAccountByEmail (email: string): Promise<any>;
}
