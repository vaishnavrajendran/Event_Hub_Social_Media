import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import BoostPost from "pages/BoostPost"

const UserRoutes = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div>
      <Routes>
        <Route path="/" element={ <LoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route 
        path="/checkout"
        element={<BoostPost/>}
        />
      </Routes>
    </div>
  );
};

export default UserRoutes;
