
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

function App() {

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="relative z-50 pt-20">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  )
}

export default App
