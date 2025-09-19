import IAccountRepository from "./IAccountRepository";
import Account from "../../Domains/Entities/account";

export default class AccountRepository implements IAccountRepository {
    
    accounts: Account[] = [];
   
   
    createAccounts(accounts: Account[]): void {
        this.accounts = accounts

        // console.log("After add to account repo ")
        // console.log(this.accounts)
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
    
    getAccountByNumber(accountNumber: string): Account | undefined {
        //let acc: Account = { accountNumber : "", balance : 0, accountType : "", ownerId: 0 };
        
        let result = this.accounts.map((a) => {
            if(a.accountNumber === accountNumber){
                return a;
            }
        })
        return result[0];
    }

    createAccount(account: Account): void {
        this.accounts.push(account);
    }
}