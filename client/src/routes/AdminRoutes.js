import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "App.css";
import Dashboard from '../pages/Dashboard.jsx';
import HostRequests from '../pages/HostRequests.jsx';
import Comment from '../pages/Comment.jsx';
import Product from '../pages/Product.jsx';
import ProductList from '../pages/ProductList.jsx';
import MainPage from '../pages/Report/MainPage';
import UserReports from '../pages/Report/UserReports'
import ProfilePage from "components/Report/ProfilePage"
import { useSelector } from "react-redux";

function AdminRoutes() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <Routes>
              <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/about/" element={isAuth ? <HostRequests /> : <Navigate to="/" />} />
              <Route path="/user-reports" element={isAuth ? <UserReports /> : <Navigate to="/" />} />
              <Route path="/reports/" element={<MainPage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/productList" element={<ProductList />} />
              <Route path="/profiles/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
      </Routes>
          {/* { isAdmin === true && <Sidebar>
          <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/product" element={<Product />} />
              <Route path="/productList" element={<ProductList />} />
          </Routes>
            </Sidebar>} */}
    </div>
  );
}

export default AdminRoutes;