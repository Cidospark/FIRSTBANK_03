import User from "../../Domains/Entities/user";

export default interface IUserService {
    getUserById(userId: number): User | undefined;
    createUser(user: User): void;
    getUsers(): User[];
}