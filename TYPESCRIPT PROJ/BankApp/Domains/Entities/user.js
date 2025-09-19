"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, name, email, accounts) {
        if (accounts === void 0) { accounts = []; }
        this.id = id;
        this.name = name;
        this.email = email;
        this.accounts = accounts;
    }
    return User;
}());
exports.default = User;
