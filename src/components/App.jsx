import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoute from "../pages/ProtectedRoute";

import CityList from "./CityList";
import CountryList from "./CountryList";
import City from "./City";
import Form from "./Form";
import SpinnerFullPage from "./SpinnerFullPage"

// import Product from "../pages/Product";
// import Pricing from "../pages/Pricing";
// import Homepage from "../pages/Homepage";
// import PageNotFound from "../pages/PageNotFound";
// import AppLayout from "../pages/AppLayout";
// import Login from "../pages/Login";

const Homepage = lazy(() => import("../pages/Homepage"));
const Product = lazy(() => import("../pages/Product"));
const Pricing = lazy(() => import("../pages/Pricing"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AppLayout = lazy(() => import("../pages/AppLayout"));
const Login = lazy(() => import("../pages/Login"));

// dist/assets/index-Bey7dVvx.css   30.57 kB │ gzip:   5.11 kB
// dist/assets/index-DoAVWEIN.js   570.94 kB │ gzip: 168.70 kB

function App() {
  // const x=3;
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
