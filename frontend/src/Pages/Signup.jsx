import React, { useState } from 'react'
import { UserStore } from '../stores/userStore';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { motion } from 'framer-motion'

const Signup = () => {

  const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

  const { signup, loading } = UserStore();

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time error clearing
    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (name === "name" && value.trim() !== "") {
        delete updatedErrors.name;
      }

      if (name === "email" && validateEmail(value)) {
        delete updatedErrors.email;
      }

      if (name === "password" && value.length >= 6) {
        delete updatedErrors.password;
        // also re-check confirmPassword match
        if (formData.confirmPassword === value) {
          delete updatedErrors.confirmPassword;
        }
      }

      if (name === "confirmPassword") {
        delete updatedErrors.confirmPassword;
      }

      return updatedErrors;
    });
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid @gmail.com email address";
    }


    if(!formData.name) newErrors.name = "username is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (formData.confirmPassword !== formData.password) {
    newErrors.confirmPassword = "Passwords do not match";
  }



    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    
    signup(formData);

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
            <h1 className="text-2xl font-medium text-center">Sign Up</h1>
            <span>
              <p className="text-sm text-center text-[#00000098]">Welcome! Please enter your details to create an account.</p>
            </span>
              <label className="block text-md font-medium">Name:</label>
              <input type="text"  
              placeholder="John Doe"
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={`border rounded-sm px-2 py-1 w-full focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-[#3131314d] focus:border-[#00000052]'
              }`} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
             <label className="block text-md font-medium ">Email:</label>
              <input type="text"  
              placeholder="example@gmail.com"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`border rounded-sm px-2 py-1 w-full focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-[#3131314d] focus:border-[#00000052]'
              }`}/>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <label className="block text-md font-medium ">Password:</label>
              <input type="password" 
              name='password'
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`border rounded-sm px-2 py-1 w-full focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-[#3131314d] focus:border-[#00000052]'
              }`}/>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <label className="block text-md font-medium ">Confirm Password:</label>
              <input 
              type="Password"  
              name='confirmPassword'
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`border rounded-sm px-2 py-1 w-full focus:outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-[#3131314d] focus:border-[#00000052]'
              }`}/>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            <button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-[#000000]
							 hover:bg-[#000000a4] focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:bg-[#00000088] transition duration-150 ease-in-out disabled:opacity-50 mt-5'
							disabled={loading}
						>
							{loading ? "Signing up..." : "Sign Up"}
						</button>
            <div>
              <p className='mt-8 text-center text-sm text-gray-400'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-black hover:text-black/70'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
            </div>
          </form>
          <div className="lg:block hidden border h-[22rem] border-[#46464628] mx-3" />
          </div>
          
          <img src="https://images.unsplash.com/photo-1651223776659-b314dd0ac0a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZXNob3AlMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3Dhttps://images.unsplash.com/photo-1651223776659-b314dd0ac0a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZXNob3AlMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D"
           alt="Error fetch image" className="object-cover w-[40rem] h-[22rem]" />
        </div>
    
    </motion.div>
  )
}

export default Signup