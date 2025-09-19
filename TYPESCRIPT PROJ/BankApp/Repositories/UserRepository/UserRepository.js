"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this.users = [];
    }
    UserRepository.prototype.getUserById = function (id) {
        var user = this.users.filter(function (u) { return u.id === id; });
        return user[0];
    };
    UserRepository.prototype.createUser = function (user) {
        this.users.push(user);
    };
    return UserRepository;
}());
exports.default = UserRepository;
