
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
import CategoryPage from "./components/CartegoryPage";
import Cart from "./components/Cart";
import { useCartStore } from "./stores/useCartStore";
import CheckOutPage from "./components/CheckOutPage";
import SuccessCheckOut from "./components/SuccessCheckOut";

function App() {

  const { user, checkAuth } = UserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="relative z-50 pt-20">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to='/' /> } />

          <Route path='/drink/:category' element={<CategoryPage />} />
          <Route path='/cart/checkout' element={user ? <CheckOutPage />: <Navigate to='/' /> } />
          <Route path='/success-checkout' element={user ? <SuccessCheckOut /> : <Navigate to='/' /> } />


          <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to='/login'/>} />

        </Routes>
      </div>

      <Toaster 
      position="bottom-right"
      reverseOrder={false}/>
    </div>
  )
}

export default App
