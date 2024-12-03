import Account from "../../domain/entity/Account";

export default interface AccountRepository {
	saveAccount (account: Account): Promise<void>;
	getAccountByEmail (email: string): Promise<Account | undefined>;
	getAccountById (accountId: string): Promise<Account>;
}