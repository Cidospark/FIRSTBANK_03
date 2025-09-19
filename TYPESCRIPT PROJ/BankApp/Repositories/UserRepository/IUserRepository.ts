import User from "../../Domains/Entities/user";

export default interface IUserRepository {
    users: User[];
    getUserById(id: number): User | undefined ;
    createUser(user: User): void;
}