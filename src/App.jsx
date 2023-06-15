import MainPage from './pages/MainPage.jsx'
import DayPage from './pages/DayPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { useState } from 'react';





function App() {

  const [city, setCity] = useState(JSON.parse(localStorage.getItem('city')) || {})
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage city={city} setCity={setCity} />,
    },
    {
      path: "/day/:dayId",
      element: <DayPage city={city} setCity={setCity} />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
