export default class Account {
    constructor(
        public accountNumber: string,
        public balance: number,
        public accountType: string,
        public ownerId: number
    ) {}
}