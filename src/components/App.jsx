import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { CitiesProvider } from "../contexts/CitiesContext";

function App() {
  // const x=3;
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route index element={<Homepage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
            <Route path="cities/:id" element={<City />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
