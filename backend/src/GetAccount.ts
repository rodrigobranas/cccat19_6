export default class GetAccount {

	constructor (readonly getAccountData: GetAccountData) {
	}
	
	async getAccount (accountId: string) {
		const accountData = await this.getAccountData.getAccountById(accountId);
		return accountData;
	}
}

// ISP - Interface Segregation Principle
export interface GetAccountData {
	getAccountById (accountId: string): Promise<any>;
}
