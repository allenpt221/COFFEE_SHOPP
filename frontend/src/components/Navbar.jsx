import { Link } from "react-router-dom"
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, User, Menu } from "lucide-react";
import { UserStore } from "../stores/userStore";


const Navbar = () => {

    const { user, logout } = UserStore();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xs">
        <div className="container mx-auto sm:py-3 py-4 px-2">
            <div className="flex items-center justify-between">
                <Link to={"/"} className="text-xl font-medium ">
                    Coffee Shop
                </Link>
                
                <nav className="sm:hidden flex gap-2">
                     {user && (
                        <Link to={"/cart"} className=" relative hover:text-[#27fc4a] flex items-center gap-2 ">
                                <ShoppingCart size={20}/>
                                <span className="hidden sm:inline">Cart</span>
                                <span className="absolute -top-3 -left-2 bg-[#01a31cad] text-black text-xs font-semibold rounded-full py-[1px] px-[5px]">
                                    3
                                </span>
                            </Link>
                    )} 
                    <Menu />
                </nav>

                <nav className="items-center space-x-5 font-medium sm:flex hidden">
                    <Link to={"/Menu"} className=" hover:text-[#27fc4a] text-lg">
                        Menu
                    </Link>
                    {user && user.role === "admin" && (
                        <Link to={"/admin"} className=" hover:text-[#27fc4a] text-lg">
                            Dashboard
                        </Link>
                    )}
                    {user ? (
                        <>
                            <Link to={"/cart"} className=" relative hover:text-[#27fc4a] flex items-center gap-2 ">
                                <span className="text-lg">Order Now</span>
                            </Link>
                            <button 
                            onClick={logout}
                            className="flex gap-2 items-center font-medium hover:text-white transition-all ease-in duration-100 bg-[#ff0000b9] py-1 px-3 rounded-lg cursor-pointer">
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