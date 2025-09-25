import { useNavigate, Link, NavLink } from "react-router-dom";
import "./NavBar.css"
import { useState, type ChangeEvent } from "react";
import { UseUserContext } from "../../hooks/useUserContext";

export default function NavBar(){

    const [formData, setFormData] = useState({search:""});
    const {search, resetList} = UseUserContext();
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {
        navigate('/')
        const searchResult = search(formData.search);
        console.log(searchResult);
    }

    const handleRestList = () => {
        resetList();
    }

    return<div className="navbar">
        <button
            className="logo"
            onClick={handleRestList}
            tabIndex={0}
            aria-label="Go to home and reset list"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                    handleRestList();
                }
            }}
        >
            <Link to='/' tabIndex={-1}>LOGO</Link>
        </button>
        <form className="search-form">
            <input 
                type="text" 
                name="search" 
                placeholder="name, age, address..." 
                onChange={handleChange}
                />
            <button
                type="button"
                onClick={handleSubmit}
                className="search-button"
                aria-label="Search"
                style={{background: "none", border: "none", padding: 0, cursor: "pointer"}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
            </button>
        </form>
        <div className="menu">
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
            </ul>
        </div>
    </div>
}