import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, LogOut,  Menu, X } from "lucide-react";
import { UserStore } from "../stores/userStore";
import { useCartStore } from "../stores/useCartStore";
import { useCostumerStore } from "../stores/costumerLocationStore";

import NavbarImage from '/Image/KPT.webp';
import { useState } from "react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = UserStore();
    const { cart } = useCartStore();

    const { order } = useCostumerStore();

    const completedOrders = order.filter(orderItem => orderItem.status === 'processing');



    const navigate = useNavigate();


    const handleLogout = async () => {
       await logout();
        navigate("/login");
    }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm print:hidden">
        <div className="container mx-auto sm:py-3 py-4 px-2">
            <div className="flex items-center justify-between">
                <Link to={"/"} className="text-xl font-medium flex items-center gap-2">
                <img src={NavbarImage} alt="" className="w-13 h-10 object-cover"/>
                    <p>
                        Kapetayo
                    </p>
                </Link>        
                <nav className="sm:hidden flex gap-2">
                     {user && (
                        <>
                        <Link to={"/cart"} className="relative hover:text-[#00000088] flex items-center gap-2  ">
                                <ShoppingCart size={18}/>
                                <span className="hidden sm:inline">{cart.length}</span>
                                <span className="absolute -top-2 -left-2 bg-[#000000]  text-white text-[9px] font-semibold rounded-full py-[1px] px-[5px]">
                                    {cart.length}
                                </span>
                            </Link>
                            <Link to={"/orders"} className={`hover:text-[#00000088] flex items-center gap-2 ${order.length <= 0 ? "hidden" : 'block'}`}>
                            <div className="relative">
                                {completedOrders.length > 0 && (
                                    <div className="absolute top-0.1 -left-1 w-3 h-3 rounded-full bg-white flex items-center justify-center shadow" aria-hidden="true">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                    </div>
                                )}
                                    <span>Orders</span>
                            </div>
                            </Link>
                        </>
                    )} 
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
                        >
                        {!isOpen ? (
                            <Menu className="w-6 h-6 text-gray-700" />
                        ) : (
                            <X className="w-6 h-6 text-gray-700" />
                        )}
                        </button>

                        {isOpen && (
                        <div className="absolute top-14 right-3 bg-white shadow-lg rounded-lg p-3 w-48 border border-gray-100 z-50 animate-fade-in">
                            <Link 
                            onClick={() => setIsOpen(false)} 
                            to={"/Menu"} 
                            className="block px-3 py-2 hover:bg-gray-50 rounded text-gray-700 transition-colors duration-200 text-base font-medium"
                            >
                            Menu
                            </Link>
                            {user ? (
                                <>
                                {user && user.role === "admin" && (
                                    <Link 
                                        onClick={() => setIsOpen(false)}
                                        to={"/admin"} 
                                        className="block px-3 py-2 hover:bg-gray-50 rounded text-gray-700 transition-colors duration-200 text-base font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <button 
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="block px-3 py-2 hover:bg-gray-50 rounded text-gray-700 transition-colors duration-200 text-base font-medium"
                                >
                                    Log Out
                                </button>
                                </>
                            ) : (
                                <>
                                <Link 
                                onClick={() => setIsOpen(false)} 
                                to={"/login"} 
                                className="block px-3 py-2 hover:bg-gray-50 rounded text-gray-700 transition-colors duration-200 text-base font-medium"
                                >
                                Log In
                                </Link>
                                <Link 
                                onClick={() => setIsOpen(false)} 
                                to={"/signup"} 
                                className="block px-3 py-2 hover:bg-gray-50 rounded text-gray-700 transition-colors duration-200 text-base font-medium"
                                >
                                Sign Up
                                </Link>
                                </>
                            )}
                        </div>       
                        )}
                    
                </nav>

                <nav className="items-center space-x-5 font-medium sm:flex hidden">
                    <Link to={"/Menu"} className=" hover:text-[#0000008e] text-lg">
                        Menu
                    </Link>
                    {user && user.role === "admin" && (
                        <Link to={"/admin"} className=" hover:text-[#0000008e] text-lg">
                            Dashboard
                        </Link>
                    )}
                    {user ? (
                        <>
                            <Link to={"/cart"} className="hover:text-[#00000088] flex items-center gap-2">
                            <div className="relative">
                                <span className="absolute -top-3 -left-2 bg-black px-2 py-1 rounded-full text-white text-[9px]">
                                    <span>
                                    {cart.length}
                                    </span> 
                                    </span>
                                <ShoppingCart size={20}/>
                            </div>
                                <span className="text-lg">Cart</span>
                            </Link>
                            {/* orderProduct path */}
                            <Link to={"/orders"} className={`hover:text-[#00000088] flex items-center gap-2 ${order.length <= 0 ? "hidden" : 'block'}`}>
                            <div className="relative">
                                {completedOrders.length > 0 && (
                                    <div className="absolute top-0.1 -left-1 w-3 h-3 rounded-full bg-white flex items-center justify-center shadow" aria-hidden="true">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                    </div>
                                )}
                                    <span>Orders</span>
                            </div>
                            </Link>
                            <button 
                            onClick={handleLogout}
                            className="flex gap-2 items-center font-medium hover:text-[#0000008f] transition-all ease-in duration-100  py-1 px-3 rounded-lg cursor-pointer">
                                <LogOut size={18}/>
                                <span>Log Out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={"/login"} className=" hover:opacity-50 border p-1 px-5 rounded-full transition-all ease-in duration-100">
                                Login
                            </Link>
                            <Link to={"/signup"} className=" bg-[#27fc4a] border border-[#27fc4a] p-1 px-5 rounded-full hover:opacity-60 transition-all ease-in duration-100">
                                Signup
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Navbar