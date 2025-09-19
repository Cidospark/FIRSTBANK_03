import User from "../../Domains/Entities/user";
import IUserService from "./IUserService";
import IUserRepository from "../../Repositories/UserRepository/IUserRepository";
import IAccountRepository from "../../Repositories/AccountRepository/IAccountRepository";
import Account from "../../Domains/Entities/account";

class UserService implements IUserService {

    constructor(private userRepo: IUserRepository, private accRepo: IAccountRepository) {}

    getUserById(userId: number): User | undefined {
        return this.userRepo.getUserById(userId);
    }
    createUser(user: User): void {
        this.userRepo.createUser(user);
        this.accRepo.createAccounts(user.accounts);
    }

    getUsers(): User[]{
        return this.userRepo.users
    }
}

export default UserService;