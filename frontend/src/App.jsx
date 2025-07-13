
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import Menu from "./components/Menu";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";


import { Navigate, Route, Routes } from "react-router-dom";
import { UserStore } from "./stores/userStore";
import { useEffect } from "react";
import CategoryPage from "./Pages/CartegoryPage";
import Cart from "./components/Cart";
import { useCartStore } from "./stores/useCartStore";
import CheckOutPage from "./Pages/CheckOutPage";
import SuccessCheckOut from "./Pages/SuccessCheckOut";
import OrderPage from "./Pages/OrderPage";
import { useProductStore } from "./stores/useProductStore";

function App() {

  const { user, checkAuth } = UserStore();
  const { getCartItems } = useCartStore();
  const { orderProduct } = useProductStore();

  useEffect(() => {
		if (!user) return;

    orderProduct();
		getCartItems();
	}, [getCartItems , orderProduct , user]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="relative z-50 pt-14 print:pt-0">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to='/' /> } />
          <Route path="/orders" element={user ? <OrderPage /> : <Navigate to='/' /> } />


          <Route path='/drink/:category' element={<CategoryPage />} />
          <Route path='/cart/checkout' element={user ? <CheckOutPage />: <Navigate to='/' /> } />
          <Route path='/success-checkout' element={user ? <SuccessCheckOut /> : <Navigate to='/' /> } />


          <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to='/login'/>} />

        </Routes>
      </div>

      <Toaster 
      reverseOrder={false}/>
    </div>
  )
}

export default App
