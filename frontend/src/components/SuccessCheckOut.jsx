import { useCostumerStore } from '@/stores/costumerLocationStore';
import { useCartStore } from '@/stores/useCartStore';
import React, { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom';

const SuccessCheckOut = () => {

  const locations = useLocation();
  const paymentSuccess = locations.state?.paymentSuccess;

  if (!paymentSuccess) {
    return <Navigate to="/" replace />;
  }

  const { location } = useCostumerStore();
  const { order, subtotal, tax, shipping, total } = useCartStore();


  const randomNumber = Math.floor(Math.random() * 5000);
  const fourDigit = String(randomNumber).padStart(4, '0');
  const datePH = new Date().toLocaleString("en-PH", {
  timeZone: "Asia/Manila",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});


const categoryTitles = {
		iceddrinks: "Ice",
		hotdrinks: "Hot",
		blended: "Blended ",
		noncoffee: "Caffeine-Free",
		desserts: "Dessert"
	};

  const percentTax = (tax / subtotal) * 100 

  

  return (
    <div className='max-w-5xl mx-auto space-y-10 '>
      <div className='space-y-2 mx-2'>
      <img src="https://plus.unsplash.com/premium_photo-1671379528106-fd5bd9e1087d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="can't read the image" className='w-20 h-20 rounded-full object-cover' />
      <h1 className='text-4xl font-bold'>Kapetolyo</h1>
        <div>
        <p className='text-xs'>Unit 202, Nepo Mall Annex Building</p>
        <p className='text-xs'>Teresa Avenue, Barangay Sto. Rosario Angeles City, Pampanga 2009 Philippines <span className='text-black/50 text-xs'>{'(Dummy Info)'}</span></p>
        </div>
      </div>
      <div className='flex justify-between sm:flex-row flex-col mx-2 sm:gap-0 gap-4'>
          <div>
            <h1 className='text-lg font-bold font-anton mt-10 mb-0'>{'Recipient :'.toUpperCase()}</h1>
            <span className='font-bold text-xl sm:ml-2 ml-0'>
              {location?.lastname + ', ' + location?.firstname}
            </span>
            {/* Additional Info */}
              <p className='text-sm sm:ml-2 ml-0 text-gray-700'>
                Phone: {location?.phoneNumber}
              </p>
              <p className='text-sm sm:ml-2 ml-0 text-gray-700'>
                Address: {location?.houseNumber}, {location?.barangay}, {location?.town}
              </p>
            </div>

            <div className='sm:w-[20rem] sm:mx-0 mx-auto'>
              <p className='bg-[#69c401] px-2 py-3 text-white font-bold text-lg '>Receipt for #{fourDigit}</p>
              <p className='px-2 text-sm pt-2 bg-black/5'>Transaction Date: {datePH}</p>
            </div>
      </div>


      <div className='overflow-hidden overflow-x-auto mx-2'>
        <table className='md:min-w-full min-w-[800px] overflow-x-auto border'>
          <thead className='bg-[#69c401] text-white h-[3rem]'>
            <th className='px-2'>Order ID</th>
            <th className='px-2'>Product</th>
            <th className='px-2'>Quantity</th>
            <th className='px-2'>Category</th>
            <th className='px-2'>Unit Price</th>
            <th className='px-2'>Subtotal</th>
          </thead>
          {order?.products.map((item, index) => (
          <tbody className='border-b '>
              <td key={index} className='text-center py-2 px-2'>{item.product}</td>
              <td className='text-center py-2 px-2'>{item.name}</td>
              <td className='text-center py-2 '>{item.quantity}</td>
              <td className='text-center py-2 '>{categoryTitles[item.category]}</td>

              <td className='text-center py-2 '>{(item.price).toFixed(2)}</td>
              <td className='text-center py-2 '>{'₱' + (item.price * item.quantity).toFixed(2)}</td>
          </tbody>
          ))}
        </table>
      </div>
      <div className='flex justify-between sm:flex-row flex-col-reverse mx-2'>
        <span className='flex flex-col justify-between h-[16rem] w-[30rem]'>
          <h1>Thank you for your purchase!</h1>
          <Link to='/' className='text-right'>Explore More Brews</Link>
        </span>

        <div className='mt-10 sm:w-[20rem] mb-20'>
          <h1 className='text-md font-semibold'>Receipt for payment</h1>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Payment Method</p>
            <p>{order?.paymentMethod}</p>
          </span>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Subtotal</p>
            <p>{'₱' + subtotal}</p>
          </span>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Tax <span className='text-black/60'>{`%(${(percentTax).toFixed(1)})`}</span></p>
            <p>{'₱' + (tax).toFixed(2)}</p>
          </span>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium'>Shipping</p>
            <p>{'₱' + shipping}</p>
          </span>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Total</p>
            <p>{'₱' + order?.totalAmount}</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SuccessCheckOut