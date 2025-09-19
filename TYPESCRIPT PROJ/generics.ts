
// non-generic version
// function ErrLogger(err: string){
//     console.log(err);
// }

// ErrLogger("Error! Sorry something bad just happened.");



// generic version
function ErrLoggerGeneric<T>(err: T){
    console.log(err);
}

ErrLoggerGeneric<string>("Error! Sorry something bad just happened.");

type errType = {
    code: number,
    msg: string
}

ErrLoggerGeneric<errType>({
    code: 200,
    msg: "Ok"
});


// generic class
class ErrorClass<T>{

    public errors: T[] = [];

    AddError(err: T){
        this.errors.push(err);
    }

     GetError<K>(err: K): K{
        return err
    }
}


const errList = [
    "User name is required!",
    "Email is not valid!",
    "Email is not confirmed!"
]
const errList2 = [ 400, 404, 403]

let errLoger = new ErrorClass<string | number>();

errList.map(e => errLoger.AddError(e))
errList2.map(e => errLoger.AddError(e))

// pring errors
errLoger.errors.map(em => console.log(em));