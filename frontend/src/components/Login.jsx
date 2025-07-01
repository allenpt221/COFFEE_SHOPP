import { useState } from "react";

import { UserStore } from "../stores/userStore";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { motion } from 'framer-motion'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading } = UserStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
      }

  return (
    <motion.div 
          initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
          className="max-w-[1120px] m-auto ">
        <div className='flex flex-col lg:flex-row justify-center items-center p-4 lg:gap-0 gap-5'>
          <div className="flex gap-5 justify-center items-center">
          <form onSubmit={handleSubmit} className="space-y-1 md:w-[40rem] sm:w-[20rem] w-[15rem] lg:w-[25rem]">
            <h1 className="text-2xl font-medium text-center">Log in</h1>
            <span>
              <p className="text-sm text-center text-[#00000098]">Welcome back! Please enter your details.Welcome back! Please enter your details.</p>
            </span>
              <label className="block text-md font-medium">Email:</label>
              <input type="text"  
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full"
              autoComplete="off"/>
             
             <label className="block text-md font-medium ">Password:</label>
              <input type="password"  
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full"
              autoComplete="off"/>
            <button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-[#000000]
							 hover:bg-[#000000a4] focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:bg-[#00000088] transition duration-150 ease-in-out disabled:opacity-50 mt-5'
							disabled={loading}
						>
							{loading ? (
								<>
									Loading...
								</>
							) : (
								<>
									Login
								</>
							)}
						</button>
            <p className='mt-8 text-center text-sm text-gray-400'>
						Not a member?{" "}
						<Link to='/signup' className='font-medium text-black hover:text-black/70'>
							Sign up now <ArrowRight className='inline h-4 w-4' />
						</Link>
					  </p>
          </form>
          <div className="lg:block hidden border h-[20rem] border-[#46464628]  mx-5" />
          </div>
          <img src="https://images.unsplash.com/photo-1651223776659-b314dd0ac0a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZXNob3AlMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D"
           alt="Error fetch image" className="object-cover w-[40rem] h-[20rem]" />
        </div>
    
    </motion.div>
  )
}

export default Login