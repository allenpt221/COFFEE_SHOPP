import { useCartStore } from '@/stores/useCartStore';
import React from 'react'
import { Link } from 'react-router-dom';

const OrderSummary = ({ total, subtotal, tax, shippingFee }) => {

    const { cart } = useCartStore();

  function formatPeso(val) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(val);
  }

  return (
    <div className='flex flex-col border w-full p-4 rounded-md shadow-sm'>
      <h1 className='text-center text-xl font-bold mb-2'>Order Summary</h1>
      
      <div className='flex justify-between'>
        <h1>Sub Total:</h1>
        <p>{formatPeso(subtotal)}</p>
      </div>
      
      <div className='flex justify-between'>
        <h1>Taxes:</h1>
        <p>{formatPeso(tax)}</p>
      </div>
        <div className='flex justify-between '>
        <h1 className='text-black/40 font-medium'>Shipping:</h1>
        <p>{formatPeso(shippingFee)}</p>
        </div>
      <div className='flex justify-between font-semibold border-t pt-2 mt-2'>
        <h1>Total:</h1>
        <p>{formatPeso(total)}</p>
      </div>

      <Link to={'checkout'} className='border mt-2 p-2 rounded-md bg-black text-white text-center font-medium text-sm hover:bg-black/80'>
        Proceed to Check Out
      </Link>
    </div>
  )
}

export default OrderSummary;
