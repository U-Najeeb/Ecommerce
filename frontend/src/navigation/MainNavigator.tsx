import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import HomePage from "../pages/HomePage/HomePage";

const MainNavigator = () => {
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route index element={<HomePage />} />
    </Routes>
  );
};

export default MainNavigator;
