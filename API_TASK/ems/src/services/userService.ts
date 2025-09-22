import { base_url } from "./apiBase";
const endpoint = "/users";
const urlPath = `${base_url}${endpoint}`;



export const getUsers = async () => {
    const res = await fetch(`${urlPath}`);
    const json = await res.json();
    return json.users;
}