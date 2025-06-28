import React, { useEffect, useState } from 'react';
import { UserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/useCartStore';
import axios from '@/lib/axios';

import { AnimatePresence, motion } from 'framer-motion';

const CheckOutPage = () => {
  const { user } = UserStore();
  const navigate = useNavigate();

  const { cart, subtotal, tax, total, shipping, checkoutSuccess } = useCartStore();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    barangay: "",
  });

  const [paymentMethod, setIsPaymentMethod] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name] && value.trim() !== "") {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.barangay.trim()) newErrors.barangay = "Barangay is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    setErrors({});
    setIsSubmitted(true);
  };


  useEffect(() => {
  if (Object.keys(errors).length > 0) {
    const timer = setTimeout(() => {
      setErrors({});
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [errors]);

  const inputGroups = [
    [
      { label: "First name", name: "firstName", placeholder: "Enter First name" },
      { label: "Last name", name: "lastName", placeholder: "Enter Last name" }
    ],
    [
      { label: "Phone number", name: "phone", placeholder: "Enter Phone number" },
      { label: "Street Address", name: "street", placeholder: "Enter Street Address" }
    ],
    [
      { label: "Town/City", name: "city", placeholder: "Enter City" },
      { label: "Barangay", name: "barangay", placeholder: "Enter Barangay" }
    ]
  ];

  function formatPeso(val) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(val);
  }
  

const handlePlaceOrder = async () => {
  try {
    // Build the product list
    const products = cart.map(item => ({
      id: item._id, 
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Calculate total
    const totalAmount = products.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await axios.post('/orders', {
      products,
      totalAmount
    });
    checkoutSuccess(); 
    navigate('/successcheckout')
  } catch (error) {
    console.error("Order placement failed:", error);
  }
};
 



  return (
    <div className="max-w-5xl mx-auto mb-50">
      {/* leftSide Flex */}
      <div className="flex lg:flex-row sm:flex-row flex-col gap-3 mx-2">
        <div className='flex flex-col gap-3'>
        <div className="border p-5 rounded-md shadow-sm w-full ">
          <h1 className="text-lg font-semibold mb-4">Shipping Information</h1>
          <form onSubmit={handleSubmit} className="space-y-3 font-sans text-[#000000b6]">
            {inputGroups.map((group, index) => (
              <div key={index} className="flex gap-2">
                {group.map((field) => (
                  <div key={field.name} className="flex-col w-full">
                    <label>{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      readOnly={isSubmitted}
                      placeholder={field.placeholder}
                      className={`border ${
                        errors[field.name] ? "border-red-500" : "border-[#3131314d]"
                      } rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] read-only:cursor-not-allowed`}
                    />
                    {errors[field.name] && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex-col w-full">
              <label>Email Address</label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="border border-[#3131314d] rounded-sm text-[#00000085] focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] read-only:cursor-not-allowed"
              />
            </div>

            {isSubmitted ? (
              <div className="flex justify-between">
                <button
                type="submit"
                disabled={isSubmitted}
                className={`rounded-md bg-black text-white text-base font-normal mt-3 px-3 py-1 ${
                  isSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/60'
                } transition-all duration-300`}
              >
                Confirm Address
              </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#00000079] cursor-pointer mr-2 text-xs hover:underline hover:text-[#67e1ff98]"
                >
                  Edit address
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <button
                  type="submit"
                  className="rounded-md bg-black text-white text-base font-normal mt-3 px-3 py-1 hover:bg-black/60 cursor-pointer transition-all duration-300"
                >
                  Confirm Address
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="rounded-md border text-black text-base font-normal mt-3 px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
        { /* Payment Information Section*/}
      <AnimatePresence>
      {paymentMethod === "Card" && (
        <motion.div 
        initial={{opacity: 0, y: 0}}
        animate={{opacity: 1, y: 0}}
        exit={{ opacity: 0, y: -10 , transition: { duration: 0.2 } }}
        transition={{duration: 0.9}}
        className="border p-5 rounded-md shadow-sm w-full ">
        <h1 className='font-medium'>Card Payment Information</h1>
          <div className="mt-5">
            <form className='space-y-2'>
              <label className='font-medium text-sm'>Cardholder Name</label>
              <input type="text" 
              placeholder='Enter Card Name'
              className='rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] border mt-1' />
              
              <label className='font-medium text-sm'>Card Number</label>
              <input type="text" 
              placeholder='Enter Phone Number'
              className='rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] border mt-1' />

              <div className='flex gap-2'>
              <div>
              <label className='font-medium text-sm'>Expiring {'(MM/YY)'}</label>
              <input type="text" 
              placeholder='example: (12/2025)'
              className='rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] border mt-1' />
              </div>
              <div>
              <label className='font-medium text-sm'>Expiring {'(MM/YY)'}</label>
              <input type="text" 
              placeholder='Card Verification Value'
              className='rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8] border mt-1' />
              </div>
              </div>

              <p className='font-medium text-sm mt-5'> We Accept the following cards</p>
              <div className='flex gap-2 items-center'>
                <img src="/public/BDO.jpg" alt="" className='w-7 h-5 rounded-xs' title='BDO '/>
                <img src="/public/pnb.png" alt="" className='w-7 h-5 rounded-xs' title='Philippine National Bank'/>
                <img src="/public/union.png" alt="" className='w-7 h-5 rounded-xs' title='UnionBank'/>
                <img src="/public/metrobank.webp" alt="" className='w-7 h-5 rounded-xs' title='Metrobank'/>
              </div>
            </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  {/* rightSide Flex */}
  <div className='flex flex-col gap-3'>
  {/* Order Summary Section */}
  <div className="border p-5 rounded-md shadow-sm w-full flex flex-col min-h-[300px]">
    <h1 className="text-lg font-semibold mb-4">Order Summary</h1>
    {/* Cart Items Section */}
    <div className="flex-grow">
      {cart.length > 0 ? (
        cart.map((cartItem, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b"
          >
            <div className="flex gap-2">
              <img
                src={cartItem?.image}
                alt=""
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-base">{cartItem?.name}</p>
                <p className="text-sm text-gray-600">
                  ₱{cartItem?.price} x {cartItem?.quantity}
                </p>
              </div>
            </div>
            <span>{formatPeso(cartItem?.price * cartItem?.quantity)}</span>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 italic py-8">Your cart is empty.</p>
      )}
    </div>

    {/* 📦 Totals Section — always pinned at bottom */}
    <div className="mt-4 space-y-2 border-t pt-4">
      <div className="flex justify-between">
        <p>Sub Total</p>
        <p>{formatPeso(subtotal)}</p>
      </div>
      <div className="flex justify-between">
        <p>Estimated Tax</p>
        <p>{formatPeso(tax)}</p>
      </div>
      <div className="flex justify-between">
        <p>Shipping Fee</p>
        <p>{formatPeso(shipping)}</p>
      </div>
      <div className="flex justify-between font-semibold">
        <p>Total Amount (PHP)</p>
        <p>{formatPeso(total)}</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="text-center w-full bg-black rounded-md text-white py-2 mt-3 hover:bg-black/80 cursor-pointer"
      >
        Place Order
      </button>
      </div>
    </div>
    
    {/* payment Method */}
      <div className='border p-5 rounded-md shadow-sm w-full space-y-4'>
        <div>
          <h1 className='text-base font-medium'>Payment Method</h1>
          <p className='mt-1 text-sm text-black/80'>Choose Payment</p>
        </div>

        <div className='space-y-4'>
          <button
           onClick={() => setIsPaymentMethod('COD')}
           className={`border w-full text-left p-2 rounded-md cursor-pointer shadow-inner ${paymentMethod === 'COD' ? 'shadow-blue-700' : ""}`}>

            <span className='flex justify-between items-center'>
              <p>Cash On Delivery {'(COD)'} </p>
              <img src="/public/COD.png" alt="" className='w-15 h-8   object-cover' />
            </span>
          </button>
          <button
           onClick={() => setIsPaymentMethod('Gcash')}
           className={`border w-full text-left p-2 rounded-md cursor-pointer shadow-inner ${paymentMethod === 'Gcash' ? 'shadow-blue-700' : ""}`}>
              <span className='flex justify-between items-center'>
                <p>Gcash </p>
                <img src="/public/gcash.jpg" alt="" className='w-15 h-8 rounded-md' />
              </span>          
            </button>
            <button
              onClick={() => setIsPaymentMethod('Card')}
              className={`border w-full text-left p-2 rounded-md cursor-pointer shadow-inner ${paymentMethod === 'Card' ? 'shadow-blue-700' : ""}`}>
                <span className='flex justify-between items-center'>
                  <p>Card </p>
                  <img src="/public/Card.png" alt="" className='w-12 h-10 rounded-md' />
                </span>          
            </button>
        </div>
      </div>
    </div>

    </div>
  </div>
  );
};

export default CheckOutPage;
