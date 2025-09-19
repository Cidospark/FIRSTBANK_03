import IAccountRepository from "./IAccountRepository";
import Account from "../../Domains/Entities/account";

export default class AccountRepository implements IAccountRepository {
    
    accounts: Account[] = [];
   
   
    createAccounts(accounts: Account[]): void {
        this.accounts = [...this.accounts, ...accounts]
    }

    updateAccount(account: Account): void {
        let dbAccount = this.getAccountByNumber(account.accountNumber);
        if (dbAccount) {
            dbAccount.balance = account.balance;
        }
        // update account in Account[]
        this.accounts.map(acc => acc.accountNumber === account.accountNumber ? 
            { ...acc, ...account } : acc)
    }
    
    getAccountByNumber(accountNumber: string): Account {
        const result = this.accounts.filter(acc => acc.accountNumber === accountNumber)[0];
        return result;
    }

    createAccount(account: Account): void {
        this.accounts.push(account);
    }
}