import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { AuthProvider } from "./context/AuthContext";  // Import the provider

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <>
                <NavBar /> 
                <Banner />
                <Movies />
              </>
            }
          />
          <Route
            path="/favourites"
            element={
              <>
                <NavBar /> 
                <Favourites />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
