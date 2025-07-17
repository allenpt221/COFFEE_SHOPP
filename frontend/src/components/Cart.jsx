import { useCartStore } from '../stores/useCartStore'
import React from 'react'
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

import { motion } from 'framer-motion'
import OrderSummary from './OrderSummary';

const Cart = () => {
  const { cart, total, subtotal, tax, shipping } = useCartStore();

  
  return (
    <div className='py-8 md:py-16'>
      <div className='mx-auto max-w-screen-2xl px-4 2xl:px-0 '>
        <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 gap-10'>
          <div className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-2'>
            {cart.length === 0 ? (
							<EmptyCartUI />
						) : (
              <motion.div
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.1}}
              className='space-y-3'
              >
              {cart.map((item) => (
                <CartItem cart={item} key={item._id}/>
              ))}
              </motion.div>
            )}
          </div>
          {cart.length > 0 && (
              <motion.div
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.2}}
               className='w-full lg:mt-0 mt-5'>
                <OrderSummary total={total} tax={tax} subtotal={subtotal} shippingFee={shipping}/>
                
              </motion.div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Cart

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 py-16'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-gray-300' />
		<h3 className='text-2xl font-semibold '>Your cart is empty</h3>
		<p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
			className='mt-4 rounded-md bg-[#000] px-6 py-2 text-white transition-colors hover:bg-[#000000a2] font-medium'
			to='/menu'
		>
			To Go menu
		</Link>
	</motion.div>
);
