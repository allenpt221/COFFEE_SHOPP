import { useCartStore } from '@/stores/useCartStore'
import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'

const CartItem = ({ cart }) => {

	const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <div className='rounded-lg border p-4 shadow-sm'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-1'>
				<div className='shrink-0 md:order-1'>
					<img className='h-20 md:h-32 rounded-sm object-cover' src={cart.image} />
				</div>
				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-1 px-2 border '>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center cursor-pointer'
							onClick={() => updateQuantity(cart._id, cart.quantity - 1)}
						>
							<Minus className='text-[#00000093] ' />
						</button>
						<p className='px-1'>{cart.quantity}</p>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center cursor-pointer'
							onClick={() => updateQuantity(cart._id, cart.quantity + 1)}
						>
							<Plus className='text-[#00000093]' />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
					{cart.discounted === 'Discounted' ? (
						<>
						<p className='text-sm line-through text-gray-400'>₱{cart.price.toFixed(2)}</p>
						<p className='text-base font-semibold'>
							₱{(cart.price * 0.75).toFixed(2)}
						</p>
						</>
					) : (
						<p className='text-base'>₱{cart.price.toFixed(2)}</p>
					)}
</div>

				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='text-base font-medium hover:text-[#35353560]  hover:underline'>
						{cart.name}
					</p>
					<p className='text-sm text-gray-400'>{cart.description}</p>

					<div className='flex items-center gap-4'>
						<button
							className='inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline cursor-pointer'
							onClick={() => removeFromCart(cart._id)}
						>
							<Trash size={15}/>
						</button>
					</div>
				</div>
			</div>
		</div>
  )
}



export default CartItem