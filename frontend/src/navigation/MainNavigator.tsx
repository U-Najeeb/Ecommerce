import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import HomePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import Profile from "../pages/Profile/Profile";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { useUserContext } from "../context/userContext";

const MainNavigator = () => {
  const location = useLocation();
  const [searchResults, setSearchResult] = useState("");
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  const renderNavbar = !isLoginPage && !isSignUpPage;

  useEffect(() => {
    const autoLogin = async () => {
      const response = await useAxios.post("/auth/validate-token", {});
      if (userData) {
        return;
      } else {
        if (response.status === 200) {
          setUserData(response?.data?.user);
          navigate("/");
        }
      }
    };
    autoLogin();
  }, [navigate, setUserData]);

  return (
    <>
      {renderNavbar && (
        <Navbar
          searchResults={searchResults}
          setSearchResult={setSearchResult}
        />
      )}
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route index element={<HomePage />} />
        <Route path={"/products/:category"} element={<ProductsPage />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
    </>
  );
};

export default MainNavigator;
