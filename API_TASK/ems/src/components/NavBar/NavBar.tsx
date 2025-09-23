import { Link, NavLink } from "react-router-dom";
import "./NavBar.css"
import { useState, type ChangeEvent } from "react";
import { search } from "../../services/userService";

export default function NavBar(){

    const [formData, setFormData] = useState({search:""});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        const searchResult = await search(formData.search);
        console.log(searchResult);
    }

    return<div className="navbar">
        <div className="logo">
            <Link to='/'>LOGO</Link>
        </div>
        <form className="search-form">
            <input 
                type="text" 
                name="search" 
                placeholder="name, age, address..." 
                onChange={handleChange}
                />
            <div onClick={handleSubmit}>
                <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </div>
        </form>
        <div className="menu">
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
            </ul>
        </div>
    </div>
}