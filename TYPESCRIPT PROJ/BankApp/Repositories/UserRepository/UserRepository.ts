import User from "../../Domains/Entities/user";
import IUserRepository from "./IUserRepository";

export default class UserRepository implements IUserRepository {

    public users: User[] = [];

    getUserById(id: number): User | undefined {
         let user = this.users.filter((u) => u.id === id )
        return user[0];
    }
    createUser(user: User):void {
        this.users.push(user);
    }

}