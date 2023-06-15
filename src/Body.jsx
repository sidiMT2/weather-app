import DayWeather from "./DayWeather"
import "./styles/body.css"

export default function Body({ city }) {
    return (
        <div className="main-content">
            <CityInfo location={city.location} />
            <ForecastDiv forecastday={city.forecast.forecastday} location={city.location} />
        </div>
    )
}


export function ForecastDiv({ forecastday, location }) {
    return (
        < div className="forecast-info">
            {forecastday.map((forecastday, index) => {
                return <DayWeather
                    key={index}
                    forecastday={forecastday}
                    index={index + 1}
                    location={location} />
            })
            }
        </div>
    )
}

export function CityInfo({ location }) {
    return (
        <div className="city-info">
            <p>
                <svg className="location-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" /></svg>
                <span >{location.name}</span> - {location.country}</p>
        </div>
    )
}
