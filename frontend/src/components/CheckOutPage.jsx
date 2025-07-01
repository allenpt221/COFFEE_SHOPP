import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import valid from 'card-validator';

import { UserStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/useCartStore';
import { useCostumerStore } from '@/stores/costumerLocationStore';

import { QRCodeCanvas } from 'qrcode.react';
import axios from '@/lib/axios';
import { AnimatePresence, motion } from 'framer-motion';

import Card from '/Image/Card.webp';
import Gcash from '/Image/Gcash.webp';
import COD from '/Image/COD.webp';

import BDO from '/Image/BDO.jpg';
import Visa from '/Image/visa.png';
import PNB from '/Image/PNB.png';
import Metro from '/Image/metrobank.webp';
import Union from '/Image/union.png';

const cardImage = [Visa, BDO, Metro, PNB, Union];

const paymentImages = {
  COD,
  Gcash,
  Card,
};

const CheckOutPage = () => {
  const { user } = UserStore();
  const navigate = useNavigate();
  const { cart, subtotal, tax, total, shipping, checkoutSuccess, submitOrder } = useCartStore();
  const { createLocation } = useCostumerStore();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    houseNumber: "",
    town: "",
    barangay: "",
    emailAddress: ""
  });

  const [formCard, setFormCard] = useState({
    cardholder: '',
    cardnumber: '',
    expiring: '',
    cvv: ''
  });

  const [paymentMethod, setIsPaymentMethod] = useState('');
  const [cardType, setCardType] = useState('');


  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        emailAddress: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === 'phoneNumber' ? value.replace(/\D/g, '') : value;


    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    if (errors[name] && sanitizedValue.trim()) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['cardnumber', 'cvv'];

    let sanitizedValue = numericFields.includes(name)
      ? value.replace(/\D/g, '')
      : value;

    if (name === 'cardnumber') {
      const cardValidation = valid.number(sanitizedValue);

      if (!cardValidation.isPotentiallyValid) {
        setErrors((prev) => ({
          ...prev,
          [name]: 'Card number is not valid',
        }));
        setCardType('');
      } else if (!cardValidation.isValid) {
        setErrors((prev) => ({
          ...prev,
          [name]: 'Card number is incomplete or invalid',
        }));
        setCardType(cardValidation.card?.type || '');
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
        setCardType(cardValidation.card?.type || '');
      }
    }

    setFormCard((prev) => ({ ...prev, [name]: sanitizedValue }));

    if (errors[name] && sanitizedValue.trim()) {
      if (name !== 'cardnumber' || sanitizedValue.length === 16) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = `${key} is required`;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 6);
    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2), 10);
      if (month < 1 || month > 12) return;
    }
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setFormCard((prev) => ({ ...prev, expiring: value }));
  };

  const isExpiryValid = (dateStr) => {
    const [month, year] = dateStr.split('/');
    if (!month || !year) return false;
    const inputDate = new Date(parseInt(year), parseInt(month) - 1);
    const now = new Date();
    return inputDate >= new Date(now.getFullYear(), now.getMonth());
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const newErrors = {};
      if (!isSubmitted) newErrors.address = "Please confirm your shipping address before placing the order.";
      if (!paymentMethod) newErrors.paymentMethod = "Please choose a payment method.";

      if (paymentMethod === "Card") {
        if (!formCard.cardholder.trim()) newErrors.cardholder = "Cardholder name is required";
        if (!formCard.cardnumber.trim()) newErrors.cardnumber = "Card number is required";
        if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(formCard.expiring)) {
          newErrors.expiring = "Expiry must be in MM/YYYY format";
        } else if (!isExpiryValid(formCard.expiring)) {
          newErrors.expiring = "Card expiry is in the past";
        }
        if (!formCard.cvv.trim()) newErrors.cvv = "CVV is required";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }


      
      submitOrder(paymentMethod , formCard)
      createLocation(formData);
      checkoutSuccess();
      navigate('/success-checkout', { state: { paymentSuccess: true } });
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  };

  const inputGroups = [
    [
      { label: "First name", name: "firstname", placeholder: "Enter First name" },
      { label: "Last name", name: "lastname", placeholder: "Enter Last name" }
    ],
    [
      { label: "Phone number", name: "phoneNumber", placeholder: "Enter Phone number" },
      { label: "Street Name, Building, House No.", name: "houseNumber", placeholder: "Enter Street Address" }
    ],
    [
      { label: "Town/City", name: "town", placeholder: "Enter City" },
      { label: "Barangay", name: "barangay", placeholder: "Enter Barangay" }
    ]
  ];

  function formatPeso(val) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(val);
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);


  return (
    <div className="max-w-5xl mx-auto mb-50">
      <div className="flex lg:flex-row md:flex-row flex-col gap-3 mx-2">
        {/* LEFT SIDE */}
        <div className='flex flex-col gap-3 w-full'>
          {/* SHIPPING */}
          <div className="border p-5 rounded-md shadow-sm w-full">
            <h1 className="text-lg font-semibold mb-4">Shipping Information</h1>
            <form onSubmit={handleSubmit} className="space-y-3 font-sans text-[#000000b6]">
              {inputGroups.map((group, index) => (
                <div key={index} className="flex gap-2">
                  {group.map((field) => {
                    const isPhone = field.name === 'phoneNumber';
                    return(
                    <div key={field.name} className="flex-col w-full">
                      <label className='line-clamp-1 xl:line-clamp-none'>{field.label}</label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        readOnly={isSubmitted}
                        placeholder={field.placeholder}
                        maxLength={isPhone ? 16 : undefined}
                        className={`border ${errors[field.name] ? "border-red-500" : "border-[#3131314d]"} 
                        rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full read-only:bg-[#f8f8f8]`}
                      />
                      {errors[field.name] && <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>}
                    </div>
                    );
                  })}
                </div>
              ))}

              <div className="flex-col w-full">
                <label>Email Address</label>
                <input
                  type="text"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  readOnly
                  className="border border-[#3131314d] rounded-sm text-[#00000085] px-2 py-1 w-full bg-[#f8f8f8]"
                />
              </div>

              {isSubmitted ? (
                <div className="flex justify-between">
                  <button
                    type="submit"
                    disabled
                    className="rounded-md bg-black text-white mt-3 px-3 py-1 opacity-50 cursor-not-allowed"
                  >
                    Confirmed
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm text-[#00000079] hover:text-[#67e1ff98] hover:underline"
                  >
                    Edit address
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  <button
                    type="submit"
                    className="rounded-md bg-black text-white mt-3 px-3 py-1 hover:bg-black/60"
                  >
                    Confirm Address
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="rounded-md border mt-3 px-3 py-1 hover:bg-black hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* CARD SECTION */}
          <AnimatePresence>
            {paymentMethod === "Card" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 0 }}
                className="border p-5 rounded-md shadow-sm w-full"
              >
                <h1 className='font-medium'>Card Payment Information</h1>
                <form className='space-y-2 mt-5'>
                  <label className='font-medium text-sm'>Cardholder Name</label>
                  <input type="text" 
                  placeholder='Enter Cardholder name'
                  name="cardholder" 
                  value={formCard.cardholder} 
                  onChange={handleCardChange} 
                  className='border px-2 py-1 w-full rounded-sm' />
                  {errors.cardholder && <p className="text-red-500 text-sm">{errors.cardholder}</p>}

                  <label className='font-medium text-sm'>Card Number</label>
                  <input type="text" 
                  placeholder='Enter Card Number'
                  name="cardnumber" 
                  maxLength={19}
                  value={formCard.cardnumber} 
                  onChange={handleCardChange} className='border px-2 py-1 w-full rounded-sm' />
                  {errors.cardnumber && <p className="text-red-500 text-sm">{errors.cardnumber}</p>}

                  <div className='flex gap-2'>
                    <div className='w-1/2'>
                      <label className='font-medium text-sm'>Expiring (MM/YYYY)</label>
                      <input type="text" 
                      name="expiring" 
                      value={formCard.expiring} 
                      onChange={handleExpiryChange} 
                      placeholder='example: (12/2025)'
                      className='border px-2 py-1 w-full rounded-sm' />
                      {errors.expiring && <p className="text-red-500 text-sm">{errors.expiring}</p>}
                    </div>
                    <div className='w-1/2'>
                      <label className='font-medium text-sm'>CVV</label>
                      <input type="text" 
                      placeholder='Enter Card Verification Value'
                      name="cvv" 
                      value={formCard.cvv} 
                      onChange={handleCardChange} 
                      maxLength={6}
                      className='border px-2 py-1 w-full rounded-sm' />
                      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                  </div>
                  {cardType && (
                    <p className="my-2 text-md">
                      Card Type:
                      <span className='ml-1 text-blue-500/70 font-medium'>
                        {cardType.toUpperCase()}
                        </span> 
                    </p>
                  )}

                </form>
                <div className="flex gap-2">
                {cardImage.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Payment method: ${index + 1}`}
                    className="w-5 h-5 object-contain"
                  />
                ))}
              </div>

              </motion.div>
            )}
            {paymentMethod === "Gcash" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 0 }}
                className="border p-5 rounded-md shadow-sm w-full"
              >
                <div className="flex gap-2">
                  <p className="font-semibold mb-2">Send GCash Payment to:</p>
                  <p className="text-blue-500/50 mb-2">0919 393 2431</p>
              </div>
              <p className='text-center text-black/60 font-bold'>Or</p>
              <div className='flex flex-col items-center my-2'>
                  <QRCodeCanvas value="Gcash: 09193932431" size={192} />
              </div>
                  <p className="mt-2 text-sm text-gray-500">Scan QR to copy number</p>

              <p className='font-medium mt-5 text-center text-black/90'>Once payment is received, your order will be processed immediately.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex flex-col gap-3 xl:w-[35rem] md:w-[40rem]'>
          {/* Order Summary */}
          <div className="border p-5 rounded-md shadow-sm w-full">
            <h1 className="text-lg font-semibold mb-4">Order Summary</h1>
            <div className="flex-grow">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b">
                  <div className="flex gap-2">
                    <img src={item.image} className="w-24 h-16 object-cover rounded" />
                    <div>
                      <p className="font-semibold text-base">{item.name}</p>
                      <p className="text-sm text-gray-600">₱{item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <span>{formatPeso(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-2 border-t pt-4">
              <div className="flex justify-between"><p>Sub Total</p><p>{formatPeso(subtotal)}</p></div>
              <div className="flex justify-between"><p>Estimated Tax</p><p>{formatPeso(tax)}</p></div>
              <div className="flex justify-between"><p>Shipping Fee</p><p>{formatPeso(shipping)}</p></div>
              <div className="flex justify-between font-semibold"><p>Total Amount (PHP)</p><p>{formatPeso(total)}</p></div>

              <button onClick={handlePlaceOrder} 
              type='submit'
              className="w-full bg-black rounded-md text-white py-2 mt-3 hover:bg-black/80 cursor-pointer">
                Place Order
              </button>
              {errors.address && <p className="text-red-500 text-sm mt-2">{errors.address}</p>}
            </div>
          </div>

          {/* Payment Method */}
          <div className='border p-5 rounded-md shadow-sm w-full space-y-4'>
            <h1 className='text-base font-medium'>Payment Method</h1>
            <p className='mt-1 text-sm text-black/80'>Choose Payment</p>
            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}

            {['COD', 'Gcash', 'Card'].map((method) => (
              <button
                key={method}
                onClick={() => setIsPaymentMethod(method)}
                className={`border w-full text-left p-2 rounded-md shadow-inner ${paymentMethod === method ? 'shadow-blue-700' : ''}`}
              >
                <span className='flex justify-between items-center'>
                  <p>{method}</p>
                  <img src={paymentImages[method]} className="w-12 h-8 object-cover" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
