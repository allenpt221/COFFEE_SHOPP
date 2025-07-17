import { useProductStore } from '../stores/useProductStore';
import { motion } from 'framer-motion';
import { CirclePercent } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const Coffee = [
    {
      image:
        'https://plus.unsplash.com/premium_photo-1671559021551-95106555ee19?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alternate: 'Error fetching image',
      category: 'Hot Drinks',
      href: '/hotdrinks',
    },
    {
      image:
        'https://images.unsplash.com/photo-1709689242523-c6d8027c7499?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alternate: 'Error fetching image',
      category: 'Iced Drinks',
      href: '/iceddrinks',
    },
    {
      image:
        'https://images.unsplash.com/photo-1530373239216-42518e6b4063?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alternate: 'Error fetching image',
      category: 'Blended / Frappe',
      href: '/blended',
    },
    {
      image:
        'https://136815070.cdn6.editmysite.com/uploads/1/3/6/8/136815070/LGNRQWJIX3SJ2M45SX7IGR6O.jpeg',
      alternate: 'Error fetching image',
      category: 'Non-Coffee Options',
      href: '/noncoffee',
    },
    {
      image:
        'https://www.mybakingaddiction.com/wp-content/uploads/2022/08/plated-blueberry-cheesecake-hero.jpg',
      alternate: 'Error fetching image',
      category: 'Desserts',
      href: '/desserts',
    },
  ];

  return (
    <div className='py-8 md:py-16'>
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className='text-center text-2xl font-medium mx-5'
      >
        Step inside and slow down. We've got the perfect cup waiting for you.
      </motion.h1>

      <div className='max-w-[1280px] m-auto mt-10 px-5'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 place-items-center'
        >
          {Coffee.map((item) => {
            const categoryKey = item.href.replace('/', ''); // extract category like "iceddrinks"
            const hasDiscount = products?.some(
              (p) => p.category === categoryKey && p.discounted === 'Discounted'
            );

            return (
              <div
                className='relative w-full bg-[#fffefeb2] shadow-lg p-2 rounded-md cursor-pointer'
                key={item.image}
              >
                <Link to={`/drink${item.href}`}>
                  <img
                    src={item.image}
                    alt={item.alternate}
                    className='h-[20rem] object-cover w-full rounded-md hover:scale-101 transition-all ease-in duration-300'
                  />
                  <span className='absolute right-4 bottom-3 bg-[#ffffff] text-xs px-2 font-semibold py-1 rounded-full'>
                    {item.category}
                  </span>

                  {hasDiscount && (
                    <div className='absolute top-5 left-5 flex items-center gap-2 text-white px-2 py-1 rounded-full bg-[#68380b]'>
                      <CirclePercent size={20} />
                      <span className='text-xs'>Discounts on Select Favorites!</span>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
