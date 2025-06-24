
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Menu from "./components/Menu";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

import { Navigate, Route, Routes } from "react-router-dom";
import { UserStore } from "./stores/userStore";
import { useEffect } from "react";

function App() {

  const { user, checkAuth } = UserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="relative z-50 pt-20">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to='/login'/>} />
        </Routes>
      </div>

      <Toaster />
    </div>
  )
}

export default App
