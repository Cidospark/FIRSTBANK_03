function fetchUser(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (id === 0)
                reject("User not found");
            else
                resolve({ id: id, name: "Ada" });
        }, 5000);
    });
}
// get user using promise typing
function getUser(id) {
    try {
        var user = { id: 0, name: "" };
        fetchUser(user.id)
            .then(function (user) {
            console.log(user);
        })
            .catch(function (error) {
            console.error("Error:", error.message);
        });
    }
    catch (err) {
    }
}
