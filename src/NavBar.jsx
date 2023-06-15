import { useEffect, useRef, useState } from "react"
import SuggetionsPanel from "./SuggetionsPanel"


import './styles/navbar.css'
import { Link } from "react-router-dom";

export default function NavBar({ setCity }) {

    const [searchText, setSearchText] = useState('');
    const [suggetions, setSuggetions] = useState([]);


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_WEATHER_API_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_WEATHER_API_HOST
        }
    };

    let inputRef = useRef(null)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                if (inputRef.current.parentNode.nextSibling !== null) {
                    e.preventDefault();
                    inputRef.current.parentNode.nextSibling.firstChild.firstChild.focus({ focusVisible: true });
                }
            }
        }
        inputRef.current.addEventListener('keydown', handleKeyDown);
        return () => {
            (inputRef.current)?.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${searchText}&days=3`;
        try {
            setSearchText('');
            setSuggetions([])
            const response = await fetch(url, options);
            const result = await response.json();
            setCity(result)
            localStorage.setItem('city', JSON.stringify(result))
        } catch (error) {
            console.error(error);
        }
    }


    const handleChange = async (e) => {
        setSearchText(e.target.value);
        if (e.target.value.length > 2) {
            const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${e.target.value}`;
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setSuggetions(result)
            } catch (error) {
                console.error(error);
            }
        }
        else {
            setSuggetions([])
        }
    }


    return (
        <nav className="nav-bar">
            <div className="logo">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M14.812 20.171c-.791.523-1.738.829-2.757.829-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.019-.306 1.966-.829 2.757l2.829 2.829-1.414 1.414-2.829-2.829zm-9.083-1.171c-3.528 0-5.729-2.65-5.729-5.5 0-2.702 1.952-4.945 4.521-5.408.212-3.951 3.474-7.092 7.479-7.092 4.006 0 7.267 3.141 7.479 7.092 2.57.463 4.521 2.706 4.521 5.408 0 2.881-2.261 5.5-5.62 5.5.433-.909.675-1.927.675-3 0-3.863-3.137-7-7-7-3.864 0-7 3.137-7 7 0 1.073.242 2.091.674 3m6.326-6c1.655 0 3 1.345 3 3s-1.345 3-3 3c-1.656 0-3-1.345-3-3s1.344-3 3-3" /></svg>
            </div>
            <SearchBar handleSubmit={handleSubmit}
                handleChange={handleChange}
                suggetions={suggetions}
                setSuggetions={setSuggetions}
                searchText={searchText}
                setSearchText={setSearchText}
                inputRef={inputRef}
            />
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/">Forecast</a>
                <Link to="/day/1" >Day</Link>
            </div>
        </nav>
    )
}


export function SearchBar({ handleSubmit, handleChange, searchText, setSearchText, suggetions, inputRef }) {
    return (
        <div className="search-bar" >
            <form action="/" onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" onChange={handleChange} placeholder="Seach..." value={searchText} />
                <button type="submit"><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" /></svg> </button>
            </form>
            {suggetions.length > 0 && <SuggetionsPanel suggetions={suggetions} setSearchText={setSearchText} inputRef={inputRef} />
            }
        </div>
    )
}
