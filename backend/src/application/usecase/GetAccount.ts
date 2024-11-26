import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetAccount {

	constructor (readonly accountRepository: AccountRepository) {
	}
	
	async execute (accountId: string) {
		const accountData = await this.accountRepository.getAccountById(accountId);
		return accountData;
	}
}
