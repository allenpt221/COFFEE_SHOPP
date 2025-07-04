import { useCartStore } from '@/stores/useCartStore';
import { useProductStore } from '@/stores/useProductStore'
import { UserStore } from '@/stores/userStore';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const BestSelling = () => {

    const { products, fetchProducts } = useProductStore();
    const { user } = UserStore();
    const { addToCart } = useCartStore();
    useEffect(() => {
    fetchProducts();
    }, []);

    const featuredNames = ['Matcha Latte', 'Vanilla Latte', 'Caramel Matchiato', 'Americano'];

    const bestsellerMatch = products.filter((item) =>
    featuredNames.includes(item.name)
    );


    const addCart = (item) => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        }
        addToCart(item);
        };


  return (
    <div className='max-w-7xl mx-auto mb-50'>
    <div className='sm:mx-20 mx-2'>
    <h1 className='md:text-2xl text-3xl mb-2 sm:text-start text-center font-semibold mx-5'>Customer Favorite</h1>
    <div className='w-[20rem]'>
        <p className='mx-5 text-base'>Enjoy more than {products.length} delicious picks from our coffee menu.</p>
    </div>
    </div>

    <div className='grid grid-cols-4 gap-4 mx-5 mt-5'>
  {bestsellerMatch.map((item) => (
    <div
      key={item._id}
      className='flex border flex-col justify-between px-5 py-3 rounded shadow-sm hover:shadow-md transition'
    >
      <img
        src={item.image}
        alt={item.name}
        className='w-full h-auto max-h-40 object-cover rounded mb-2'
      />
      <p className='font-medium'>{item.name}</p>
      <p className='text-xs text-gray-500'>{item.description}</p>
      <button className='border mt-5 rounded-md hover:text-white hover:bg-black py-1 px-2 font-medium cursor-pointer'
      onClick={() => addCart(item)}
      >Add to Cart - {'₱' +(item.price).toFixed(2)}</button>
    </div>
  ))}
</div>


    </div>
  )
}

export default BestSelling