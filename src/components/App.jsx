import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Product from "../pages/Product";
import Pricing from "../pages/Pricing";
import Homepage from "../pages/Homepage";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../pages/AppLayout";
import Login from "../pages/Login";
import CityList from "./CityList";
import CountryList from "./CountryList";
import City from "./City";
import Form from "./Form";

const BASE_URL = "http://localhost:8000";
function App() {

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function(){
    async function fetchCities(){
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error fetching cities data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  // const x=3;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route index element={<Homepage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities/:id' element={<City/>} />
          <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
