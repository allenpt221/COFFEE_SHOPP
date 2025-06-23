import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loading = false;


  return (
    <div className="max-w-[1120px] m-auto">
        <div className='flex justify-center items-center p-4'>
          <div className="flex gap-5">
          <form className="space-y-1">
            <h1 className="text-center mt-2">Log in</h1>
              <label className="block text-md font-medium">Email:</label>
              <input type="text"  
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1"/>
             
             <label className="block text-md font-medium ">Password:</label>
              <input type="password"  
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1"/>
            <button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-[#000000]
							 hover:bg-[#000000a4] focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:bg-[#00000088] transition duration-150 ease-in-out disabled:opacity-50 mt-5'
							disabled={loading}
						>
							{!loading ? (
								<>
									Loading...
								</>
							) : (
								<>
									Login
								</>
							)}
						</button>
          </form>
          <div className="border h-[20rem] border-[#46464628] " />
          </div>
          <div class="w-px h-full bg-gray-300 mx-4"></div>
          <img src="https://media.istockphoto.com/id/2043823329/photo/internet-network-cybersecurity-concept-data-privacy-protection-from-malicious-attacks-digital.jpg?s=612x612&w=0&k=20&c=EdSpTwVaTVMvZUUHk4d13L1VJsb2PxnPxRPrlmtIxOw=" alt="Error fetch image" className="object-cover w-[40rem] h-[20rem]" />
        </div>
    
    </div>
  )
}

export default Login