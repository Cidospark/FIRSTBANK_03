const base_url = "https://dummyjson.com";
const endpoint = "/users";
const urlPath = `${base_url}${endpoint}`;

export const getUsers = async () => {
    // return fetch(`${urlPath}`)
    // .then(res => res.json())
    // .then(res => {
    //     return res.users
    // })
    // .catch(err => {
    //     console.error(err)
    //     return [];
    // })

    const res = await fetch(`${urlPath}`);
    return await res.json();
}
