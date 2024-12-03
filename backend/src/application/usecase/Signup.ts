import AccountRepository from "../../infra/repository/AccountRepository";
import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/entity/Account";

// Use case
export default class Signup {
	// DIP - Dependency Inversion Principle
	constructor (readonly accountRepository: AccountRepository, readonly mailerGateway: MailerGateway) {
	}
	
	async execute (input: any) {
		const account = Account.create(input.name, input.email, input.cpf, input.carPlate, input.password, input.isPassenger, input.isDriver);
		const existingAccount = await this.accountRepository.getAccountByEmail(account.getEmail());
		if (existingAccount) throw new Error("Duplicated account");
		await this.accountRepository.saveAccount(account);
		await this.mailerGateway.send(account.getEmail(), "Welcome", "...");
		return {
			accountId: account.getAccountId()
		}
	}
}
