import Account from "./account";

export default class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public accounts: Account[] = []
    ) {}
}