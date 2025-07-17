import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';


import Slider from '../components/Slider';
import BestSelling from '@/components/BestSelling';

import cafeChoose from '/Image/chooseCafe.png';
import cafeOrder from '/Image/orderCafe.png';
import cafeDelivery from '/Image/deliveryCafe.png';

import { motion } from 'framer-motion';
import Footer from './Footer';


import homeImage from '/Image/cafeHomeImage.png';
import homeImage1 from "/Image/coffeeHome.png";
import homeBgImage from "/Image/BackGround.png";
import homeGrabImage from "/Image/GrabDrink.png";



const orderDelivery = [
  {
    title: 'Pick Your Cafe',
    image: cafeChoose,
    subtitle: 'Explore local spots and choose your favorite vibe.'
  },
  {
    title: 'Place Your Order',
    image: cafeOrder, // you can swap this out if you have a different image
    subtitle: 'Customize your drink and confirm in just a few taps.'
  },
  {
    title: 'Enjoy Fast Delivery',
    image: cafeDelivery,
    subtitle: 'Sit back and relax your coffee is on its way!'
  }
];



const Home = () => {
 

  return (
    <motion.div 
    className="space-y-10 min-h-screen">
      {/* Top Hero Section */}
      <div className='relative overflow-hidden'>
        <div className='bg-[#66510b1e] md:h-[7rem] h-[5rem]'>
          <motion.img 
          initial={{opacity: 0, y: 0}}
          animate={{opacity: 1, y: 0}}
          transition={{ duration: 0.8}}
          src={homeGrabImage} alt="" className='absolute sm:left-10 md:top-5 left-2 lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[19rem] sm:h-[5rem] h-[5rem]' />
        </div>
        <img src={homeBgImage} alt="" className='h-[25rem] w-full object-cover' />
        <motion.div 
        initial={{opacity: 0, y: 0}}
        animate={{opacity: 1, y: 0}}
        transition={{ duration: 0.8}}
        className='absolute md:top-50 sm:top-[6rem] lg:w-[30rem] md:w-[14rem] sm:w-[12rem] w-[12rem] md:left-80 sm:left-[20rem] left-[7.5rem] top-[6rem] font-medium text-base'>
          <p>Your refreshment is chilled and ready to cool you down.
            Bold flavors, perfectly balanced exactly how you like it.
            Pick it up and sip into something great.
          </p>
        </motion.div>
        <motion.div 
        initial={{opacity: 0, y: 0}}
        animate={{opacity: 1, y: 0}}
        transition={{ duration: 0.5}}
        className='absolute lg:top-[18rem] md:top-[22rem] sm:top-[17rem] top-[27rem] sm:left-[20rem]  left-[8.5rem] float-right'>
          <Link to="/menu" className='cursor-pointer px-2 border flex gap-2 bg-[#d3d3d3b4] hover:scale-102 active:scale-95 font-medium py-1 rounded-lg items-center'>
            <p>Explore Our Menu</p>
            <MoveRight size={23} />
          </Link>
        </motion.div>
        <motion.img 
        initial={{opacity: 0, y: -25}}
        animate={{opacity: 1, y: 0}}
        transition={{ duration: 0.5}}
        src={homeImage} alt="" className='absolute top-0 right-0 sm:h-[37rem] md:block hidden' />
        <motion.img 
        initial={{opacity: 0, y: -25}}
        animate={{opacity: 1, y: 0}}
        transition={{ duration: 0.5}}
        src={homeImage1} alt="" className='absolute md:top-44 top-20 sm:left-0 -left-35 md:h-[30rem]' />
      </div>

      {/* Title */}
      <motion.section id="discounted-section"
      initial={{opacity: 0, y: -25}}
      animate={{opacity: 1, y: 0}}
      transition={{ duration: 0.5}}
      className='space-y-8'>
        <p className=' sm:mx-30 mx-0 lg:text-start text-center font-bold md:text-4xl text-2xl'>Our Best Offers for You</p>
        {/* Draggable Offer Slider */}
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between flex-col-reverse xl:flex-row gap-5 mx-2'>
            {/* left middle section */}
            <div className='w-[15rem] xl:mx-0 sm:mx-20 mx-2 mt-5'>
              <h1 className='font-medium text-lg'>Your Exclusive Menu</h1>
              <p className='text-sm'>Check out our special menu and enjoy up to 25% off selected items!</p>
              <Link 
              to='/menu' 
              className='px-5 py-2 mt-3 rounded-full bg-black hover:bg-black/70 font-medium text-white inline-block'
            >
              Browse Our 25% off
            </Link>
            </div>
            {/* right middle section - slider section*/}
            <div>
              <Slider />
            </div>
          </div>
        </div>

        {/* Best Seller section */}
        <div>
          <BestSelling />
        </div>
        {/* Delivery service section*/}
        <div className='max-w-4xl mx-auto space-y-5 mb-10'>

          <h1 className='text-center md:text-5xl sm:text-3xl text-xl font-bold'>How to Order with Delivery</h1>
          
          <div className='flex md:flex-row flex-col justify-between items-center mx-2'>
            {orderDelivery.map((item, index) => (
              <div className='flex flex-col items-center' key={index}>
                <img src={item.image} alt="" className='w-auto h-35 object-cover' />
                <div className='mt-auto text-center'>
                <h1 className='text-xl font-medium'>{item.title}</h1>
                <p className='w-[15rem] text-center text-xs'>{item.subtitle}</p>
                </div>
              </div>

            ))}
          </div>
        </div>
      </motion.section>
    
      <div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Home;
