import Account from "../../Domains/Entities/account";

export default interface IAccountService {
    getAccountDetails(accountNumber: string): Account;
    createNewAccount(accountNumber: string, initialBalance: number, ownerId: number, accountType: string): void;
    deposit(accountNumber: string, amount: number): void;
    withdraw(accountNumber: string, amount: number): void;
    transfer(fromAccountNumber: string, toAccountNumber: string, amount: number): void;
    getAccounts():Account[]
}