import UserService from "../Services/User/UserService";
import IUserService from "../Services/User/IUserService";
import IAccountService from "../Services/Account/IAccountService";
import AccountService from "../Services/Account/AccountService";
import IUserRepository from "../Repositories/UserRepository/IUserRepository";
import UserRepository from "../Repositories/UserRepository/UserRepository";
import IAccountRepository from "../Repositories/AccountRepository/IAccountRepository";
import AccountRepository from "../Repositories/AccountRepository/AccountRepository";
import TransactionRepository from "../Repositories/TransactionReposirtory/TransactionRepository";
import ITransactionRepository from "../Repositories/TransactionReposirtory/ITransactionRepository";
import ITransactionService from "../Services/Transactions/ITransactionService";
import TransactionService from "../Services/Transactions/TransactionService";


export default class DIConfig {

    static userService: IUserService;
    static accountService: IAccountService;
    static transactionService: ITransactionService

    private static  userRepository: IUserRepository = new UserRepository();
    private static  accountRepository: IAccountRepository = new AccountRepository();
    private static transactionRepository: ITransactionRepository = new TransactionRepository();    

    static Initialize() {
        this.userRepository = new UserRepository();
        this.accountRepository = new AccountRepository();
        this.userService = new UserService(this.userRepository, this.accountRepository);
        this.accountService = new AccountService(this.accountRepository, this.transactionRepository);
        this.transactionService = new TransactionService(this.transactionRepository);
    }
}