import UserService from "../Services/User/UserService";
import IUserService from "../Services/User/IUserService";
import IAccountService from "../Services/Account/IAccountService";
import AccountService from "../Services/Account/AccountService";
import IUserRepository from "../Repositories/UserRepository/IUserRepository";
import UserRepository from "../Repositories/UserRepository/UserRepository";
import IAccountRepository from "../Repositories/AccountRepository/IAccountRepository";
import AccountRepository from "../Repositories/AccountRepository/AccountRepository";


export default class DIConfig {

    static userService: IUserService;
    static accountService: IAccountService;

    private static  userRepository: IUserRepository = new UserRepository();
    private static  accountRepository: IAccountRepository = new AccountRepository();    

    static Initialize() {
        this.userRepository = new UserRepository();
        this.accountRepository = new AccountRepository();
        this.userService = new UserService(this.userRepository, this.accountRepository);
        this.accountService = new AccountService(this.accountRepository);
    }
}