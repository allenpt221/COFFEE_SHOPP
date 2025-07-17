import { useCartStore } from '../stores/useCartStore';
import { useProductStore } from '../stores/useProductStore';
import { UserStore } from '../stores/userStore';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BestSelling = () => {
  const { products, fetchProducts, loading } = useProductStore(); // assuming `loading` exists
  const { user } = UserStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredNames = ['Caramel Matchiato', 'Croissant', 'Java Chips', 'Matcha Latte'];

  const bestsellerMatch = products.filter((item) =>
    featuredNames.includes(item.name)
  );

  const addCart = (item) => {
    if (!user) {
      toast.error('Please login to add products to cart', { id: 'login' });
      return;
    }
    addToCart(item);
  };

  return (
    <div className='max-w-7xl mx-auto mb-20'>
      <div className='mx-2 flex justify-between items-center sm:flex-row flex-col gap-4'>
        <div>
        <h1 className='md:text-2xl text-3xl mb-1 xl:text-start text-center font-semibold mx-5'>
          Customer Favorite
        </h1>
        <div className='w-[20rem]'>
          <p className='mx-5 text-base text-black/60'>
            Enjoy more than {products.length} delicious picks from our coffee menu.
          </p>
        </div>
        </div>
        <Link to={'/menu'} className='bg-black px-4 py-2 text-white rounded-full hover:bg-black/70 font-medium'>Discover More</Link>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 mx-5 mt-5 place-items-center '>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className='flex flex-col justify-between px-5 py-3 border rounded shadow-sm animate-pulse'
              >
                <div className='w-full h-40 bg-gray-200 rounded mb-2' />
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
                <div className='h-3 bg-gray-200 rounded w-full mb-auto' />
                <div className='h-8 bg-gray-300 rounded mt-5 w-full' />
              </div>
            ))
          : bestsellerMatch.map((item) => (
              <div
                key={item._id}
                className='flex border flex-col lg:w-full xl:w-[19rem] sm:w-[23rem] w-[18rem] justify-between px-5 py-3 rounded shadow-sm hover:shadow-md transition'
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-auto max-h-40 object-cover rounded mb-2'
                />
                <p className='font-medium'>{item.name}</p>
                <p className='text-xs text-gray-500 mb-auto line-clamp-2'>
                  {item.description}
                </p>
                <button
                  className='border mt-5 rounded-md hover:text-white hover:bg-black py-1 px-2 font-medium cursor-pointer'
                  onClick={() => addCart(item)}
                >
                  Add to Cart - {'₱' + item.price.toFixed(2)}
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BestSelling;
