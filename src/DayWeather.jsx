
// import './styles/body.css'

export default function DayWeather({ forecastday }) {
    return (
        <div className="day-weather">
            <div className="day-name">
                <p>{new Date(forecastday.date).toLocaleDateString('en-EN', { weekday: 'long' })}</p>
                <div className="weather-icon">
                    <img src={forecastday.day.condition.icon} alt="" />
                </div>
                <div className="weather-info">
                    <p>{forecastday.day.condition.text}</p>
                    <p>{forecastday.day.avgtemp_c}°C</p>
                </div>
            </div>
        </div>
    )
}
