// non-generic version
// function ErrLogger(err: string){
//     console.log(err);
// }
// ErrLogger("Error! Sorry something bad just happened.");
// generic version
function ErrLoggerGeneric(err) {
    console.log(err);
}
ErrLoggerGeneric("Error! Sorry something bad just happened.");
ErrLoggerGeneric({
    code: 200,
    msg: "Ok"
});
// generic class
var ErrorClass = /** @class */ (function () {
    function ErrorClass() {
        this.errors = [];
    }
    ErrorClass.prototype.AddError = function (err) {
        this.errors.push(err);
    };
    ErrorClass.prototype.GetError = function (err) {
        return err;
    };
    return ErrorClass;
}());
var errList = [
    "User name is required!",
    "Email is not valid!",
    "Email is not confirmed!"
];
var errList2 = [400, 404, 403];
var errLoger = new ErrorClass();
errList.map(function (e) { return errLoger.AddError(e); });
errList2.map(function (e) { return errLoger.AddError(e); });
// pring errors
errLoger.errors.map(function (em) { return console.log(em); });
