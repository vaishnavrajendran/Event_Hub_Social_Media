import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import BoostPost from "pages/BoostPost"
import PaymentCompleted from "pages/PaymentCompleted"
import InputFields from "pages/ScheduleAppointments/InputFields";
import Messenger from "pages/messeger/Messenger";
import EditUser from "pages/EditUser";
import BoostPostDetails from "pages/BoostPostDetails"

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
        element={isAuth ? <BoostPost/> : <Navigate to="/" />  }
        />
        <Route 
        path="/payment-success/:postId/:amount"
        element={isAuth ? <PaymentCompleted/> : <Navigate to="/" />}
        />
        <Route 
        path="/chats"
        element={isAuth ? <Messenger/> : <Navigate to="/" />}
        />
        <Route 
        path="/manage-appointments"
        element={isAuth ? <InputFields/> : <Navigate to="/" />}
        />
        <Route 
        path="/edit-post/:postId"
        element={isAuth ? <EditUser/> : <Navigate to="/" />}
        />
        <Route 
        path="/postViews"
        element={isAuth ? <BoostPostDetails/> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default UserRoutes;
