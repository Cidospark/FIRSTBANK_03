import Account from "../../Domains/Entities/account";
import IAccountService from "./IAccountService";
import IAccountRepository from "../../Repositories/AccountRepository/IAccountRepository";
import ITransactionRepository from "../../Repositories/TransactionReposirtory/ITransactionRepository";
import Transaction from "../../Domains/Entities/transactions";
import { TransactionTypes } from "../../Commons/transactionTypes";

export default class AccountService implements IAccountService {

    constructor(private accRepo: IAccountRepository, private transactionRepo: ITransactionRepository) {}

    getAccountDetails(accountNumber: string): Account {
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
        this.transactionRepo.add(new Transaction(
            Math.random() + 1, 
            accountNumber, 
            TransactionTypes.deposit, 
            amount,
            "card",
            Date.now().toString(),
        ));
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
        this.transactionRepo.add(new Transaction(
            Math.random() + 1, 
            accountNumber, 
            TransactionTypes.withdrawal, 
            amount,
            "card",
            Date.now().toString(),
        ));

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
        
        // add transaction to db
        this.transactionRepo.add(new Transaction(
            Math.random() + 1, 
            fromAccountNumber, 
            TransactionTypes.transfer, 
            amount,
            "card",
            Date.now().toString(),
            toAccountNumber
        ));

    }

    getAccounts(): Account[] {
        return this.accRepo.accounts
    }
}