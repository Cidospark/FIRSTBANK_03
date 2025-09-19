"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserService = /** @class */ (function () {
    function UserService(userRepo, accRepo) {
        this.userRepo = userRepo;
        this.accRepo = accRepo;
    }
    UserService.prototype.getUserById = function (userId) {
        return this.userRepo.getUserById(userId);
    };
    UserService.prototype.createUser = function (user) {
        this.userRepo.createUser(user);
        this.accRepo.createAccounts(user.accounts);
    };
    UserService.prototype.getUsers = function () {
        return this.userRepo.users;
    };
    return UserService;
}());
exports.default = UserService;
