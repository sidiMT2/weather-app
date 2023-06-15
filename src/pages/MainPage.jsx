import NavBar from '../NavBar'
import Footer from '../Footer'
import Body from '../Body'


export default function MainPage({ setCity, city }) {
    return (
        <>
            <NavBar setCity={setCity} />
            {city.location && <Body city={city} />}
            <Footer />
        </>

    )
}
