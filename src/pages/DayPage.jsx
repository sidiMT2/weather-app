import { useParams, Link } from "react-router-dom"
import { CityInfo, ForecastDiv } from '../Body'
import '../styles/day-page.css'
import NavBar from "../NavBar"
import Footer from "../Footer"


export default function DayPage({ city, setCity }) {

    const dayId = useParams().dayId
    const locationName = window.location.href.split('city=')[1].split('&')[0].replace('_', ' ')
    const loctionCountry = window.location.href.split('country=')[1].replace('_', ' ')
    const location = { name: locationName, country: loctionCountry }



    let day = {}
    if (city.forecast.forecastday[dayId])
        day = city.forecast.forecastday[dayId]

    return (
        <div>
            <NavBar setCity={setCity} />
            <CityInfo location={location} />
            <div className="main-content">
                {city && day.hour && day.hour.map((hour, index) => {
                    return <div key={index} className="hour-weather">
                        <h2>{new Date(hour.time).getHours()}:00 h</h2>
                        <h3>{hour.temp_c}°C</h3>
                        <img src={hour.condition.icon} alt={hour.condition.text} />
                        <p>{hour.condition.text}</p>

                    </div>
                })}
            </div>

            <Footer />
        </div>
    )
}
