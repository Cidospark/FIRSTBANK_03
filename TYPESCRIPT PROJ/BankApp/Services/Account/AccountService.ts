import Account from "../../Domains/Entities/account";
import IAccountService from "./IAccountService";
import IAccountRepository from "../../Repositories/AccountRepository/IAccountRepository";

export default class AccountService implements IAccountService {

    constructor(private accRepo: IAccountRepository) {}

    getAccountDetails(accountNumber: string): Account | undefined {
        return this.accRepo.getAccountByNumber(accountNumber);
    }

    createNewAccount(accountNumber: string, initialBalance: number, ownerId: number, accountType: string): void {
        this.accRepo.createAccount(new Account(accountNumber, initialBalance, accountType, ownerId));
    }

    deposit(accountNumber: string, amount: number): void {
        if(amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }

        let account = this.accRepo.getAccountByNumber(accountNumber);
        if (!account) {
            throw new Error("Account not found.");
        }

        account.balance += amount;
        this.accRepo.updateAccount(account);
    }

    withdraw(accountNumber: string, amount: number): void {
        if(amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }

        let account = this.accRepo.getAccountByNumber(accountNumber);
        if (!account) {
            throw new Error("Account not found.");
        }
        if (account.balance < amount) {
            throw new Error("Insufficient funds.");
        }

        account.balance -= amount;
        this.accRepo.updateAccount(account);

    }

    transfer(fromAccountNumber: string, toAccountNumber: string, amount: number): void {
        let fromAccount = this.accRepo.getAccountByNumber(fromAccountNumber);
        if (!fromAccount) {
            throw new Error(`Sender with ${fromAccountNumber} not found.`);
        }
        let toAccount = this.accRepo.getAccountByNumber(toAccountNumber);
         if (!toAccount) {
            throw new Error(`Receiver with ${toAccountNumber} not found.`);
        }

        // perform withdrawal and deposit
        this.withdraw(fromAccountNumber, amount);
        this.deposit(toAccountNumber, amount);

    }

    getAccounts(): Account[] {
        return this.accRepo.accounts
    }
}