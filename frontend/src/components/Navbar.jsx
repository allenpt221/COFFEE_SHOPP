import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { UserStore } from "../stores/userStore";
import { useCartStore } from "../stores/useCartStore";
import { useCostumerStore } from "../stores/costumerLocationStore";
import NavbarImage from "/Image/KPT.webp";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = UserStore();
  const { cart } = useCartStore();
  const { order } = useCostumerStore();
  const navigate = useNavigate();

  const completedOrders = order.filter(
    (orderItem) => orderItem.status === "processing"
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm print:hidden">
      <div className="container mx-auto sm:py-3 py-4 px-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-medium flex items-center gap-2">
            <img
              src={NavbarImage}
              alt="Kapetayo Logo"
              className="w-13 h-10 object-cover"
            />
            <p>Kapetayo</p>
          </Link>

          {/* Mobile Menu & Icons */}
          <nav className="sm:hidden flex gap-2">
            {user && (
              <>
                <Link
                  to="/cart"
                  className="relative hover:text-[#00000088] flex items-center gap-2"
                >
                  <ShoppingCart size={19} />
                  <span className="absolute top-1 -left-2 bg-black text-white text-[9px] font-semibold rounded-full py-[1px] px-[5px]">
                    {cart.length}
                  </span>
                </Link>
                <Link
                  to="/orders"
                  className={`hover:text-[#00000088] flex items-center gap-2 ${
                    order.length <= 0 ? "hidden" : "block"
                  }`}
                >
                  <div className="relative">
                    {completedOrders.length > 0 && (
                      <div className="absolute top-0.1 -left-1 w-3 h-3 rounded-full bg-white flex items-center justify-center shadow">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    )}
                    <p className="font-medium text-md">Orders</p>
                  </div>
                </Link>
              </>
            )}
            {/* Toggle Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </nav>

          {/* Desktop Nav */}
          <nav className="items-center space-x-5 font-medium sm:flex hidden">
            <Link to="/Menu" className="hover:text-[#0000008e] text-lg">
              Menu
            </Link>
            {user && user.role === "admin" && (
              <Link to="/admin" className="hover:text-[#0000008e] text-lg">
                Dashboard
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/cart"
                  className="hover:text-[#00000088] flex items-center gap-2"
                >
                  <div className="relative">
                    <span className="absolute -top-3 -left-2 bg-black px-2 py-1 rounded-full text-white text-[9px]">
                      {cart.length}
                    </span>
                    <ShoppingCart size={20} />
                  </div>
                  <span className="text-lg">Cart</span>
                </Link>
                <Link
                  to="/orders"
                  className={`hover:text-[#00000088] flex items-center gap-2 ${
                    order.length <= 0 ? "hidden" : "block"
                  }`}
                >
                  <div className="relative">
                    {completedOrders.length > 0 && (
                      <div className="absolute top-0.1 -left-1 w-3 h-3 rounded-full bg-white flex items-center justify-center shadow">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    )}
                    <p className="text-lg">Orders</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center font-medium hover:text-[#0000008f] transition-all ease-in duration-100 py-1 px-3 rounded-lg cursor-pointer"
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:opacity-50 border p-1 px-5 rounded-full transition-all ease-in duration-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#27fc4a] border border-[#27fc4a] p-1 px-5 rounded-full hover:opacity-60 transition-all ease-in duration-100"
                >
                  Signup
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* AnimatePresence sidebar & overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/20 bg-opacity-40 z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-54 bg-white shadow-lg z-50 sm:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <img src={NavbarImage} alt=""  className="w-12 h-12"/>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col p-4 space-y-3">
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/Menu"
                  className="hover:bg-gray-100 px-3 py-2  font-medium tex-lg border-b"
                >
                  Menu
                </Link>
                {user && user.role === "admin" && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/admin"
                    className="hover:bg-gray-100 rounded px-3 py-2 text-gray-700 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="hover:bg-gray-100 rounded px-3 py-2 text-gray-700 font-medium text-left"
                  >
                    Log Out
                  </button>
                ) : (
                  <>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/login"
                      className="hover:bg-gray-100 rounded-full px-3 py-2 font-medium border w-[8rem] text-center" 
                    >
                      Log In
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/signup"
                      className="hover:bg-gray-100 rounded-full px-3 py-2  font-medium w-[8rem] bg-[#27fc4a] border border-[#27fc4a] text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
