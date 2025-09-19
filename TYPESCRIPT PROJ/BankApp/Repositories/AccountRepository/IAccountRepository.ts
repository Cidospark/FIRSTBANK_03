import Account from "../../Domains/Entities/account";

export default interface IAccountRepository {
    accounts: Account[];
    getAccountByNumber(accountNumber: string): Account | undefined ;
    createAccount(account: Account): void;
    createAccounts(accounts: Account[]): void;
    updateAccount(account: Account): void;
}