

export default function DayWeather({ forecastday, index, location }) {

    const dayName = new Date(forecastday.date).toLocaleDateString('en-EN', { weekday: 'long' });

    const handleClick = () => {
        window.location.href = `/day/${index}?city=${location.name.replace(' ', '_')}&country=${location.country.replace(' ', '_')}`
    }


    return (
        <div className="day-weather" onClick={handleClick}>
            <div className="day-name">
                <p>{dayName === new Date().toLocaleDateString('en-EN', { weekday: 'long' }) ? 'Today' : dayName}</p>
                <div className="weather-main">
                    <img src={forecastday.day.condition.icon} alt="" />
                    <p>{forecastday.day.avgtemp_c}°C</p>
                </div>
                <div className="weather-info">
                    <div className="labels">
                        <p>Temp </p>
                        <p>Wind </p>
                        <p>Rain </p>
                    </div>
                    <div className="datails">
                        <div className="temp-interval">
                            <p className="min-temp">{forecastday.day.mintemp_c}°C </p>
                            <p className="max-temp">{forecastday.day.maxtemp_c}°C</p>
                        </div>
                        <div className="wind">
                            <p>{forecastday.day.maxwind_kph}k/h</p>
                        </div>
                        <div className="rain-chance">
                            <p>{forecastday.day.daily_chance_of_rain}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
