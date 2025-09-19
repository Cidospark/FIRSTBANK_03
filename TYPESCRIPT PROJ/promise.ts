type User = {id:number, name:string}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => 
    {
        setTimeout(() => {
        if (id === 0) 
            reject("User not found");
        else 
            resolve({ id, name: "Ada" });
        }, 5000);
    });
}


// get user using promise typing

function getUser(id: number)
{
    try{
        let user: User = {id : 0, name : ""};
        fetchUser(user.id)
        .then((user) => {
            console.log(user);
        })
        .catch((error: Error) => {
            console.error("Error:", error.message);
        });

    }catch(err){

    }
}