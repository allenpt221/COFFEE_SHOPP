import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';


import Slider from './Slider';





const Home = () => {
 

  return (
    <div className="space-y-10">
      {/* Top Hero Section */}
      <div className='relative overflow-hidden'>
        <div className='bg-[#66510b1e] md:h-[7rem] h-[5rem]'>
          <img src="/image/GrabDrink.png" alt="" className='absolute sm:left-10 md:top-5 left-2 lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[19rem] sm:h-[5rem] h-[5rem]' />
        </div>
        <img src="/image/BackGround.png" alt="" className='h-[25rem] w-full object-cover' />
        <div className='absolute md:top-50 sm:top-[6rem] lg:w-[30rem] md:w-[14rem] sm:w-[12rem] w-[12rem] md:left-80 sm:left-[20rem] left-[7.5rem] top-[6rem] font-medium text-base'>
          <p>Your refreshment is chilled and ready to cool you down.
            Bold flavors, perfectly balanced exactly how you like it.
            Pick it up and sip into something great.
          </p>
        </div>
        <div className='absolute lg:top-[18rem] md:top-[22rem] sm:top-[17rem] top-[27rem] sm:left-[20rem]  left-[8.5rem] float-right'>
          <Link to="/menu" className='cursor-pointer px-2 border flex gap-2 bg-[#d3d3d3b4] hover:scale-102 active:scale-95 font-medium py-1 rounded-lg items-center'>
            <p>Explore Our Menu</p>
            <MoveRight size={23} />
          </Link>
        </div>
        <img src="/image/cafeHomeImage.png" alt="" className='absolute top-0 right-0 sm:h-[37rem] md:block hidden' />
        <img src="/image/coffeeHome.png" alt="" className='absolute md:top-44 top-20 sm:left-0 -left-35 md:h-[30rem]' />
      </div>

      {/* Title */}
      <div className='space-y-8'>
        <p className=' sm:mx-30 mx-0 lg:text-start text-center font-bold md:text-4xl text-2xl'>Our Best Offers for You</p>
      
        {/* Draggable Offer Slider */}
        <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between flex-col-reverse xl:flex-row gap-5 mx-2'>
          <div className='w-[15rem] xl:mx-0 sm:mx-20 mx-2'>
            <h1 className='font-medium text-lg'>Your Exclusive Menu</h1>
            <p className='text-sm'>Check out our special menu and enjoy up to 25% off selected items!</p>
            <Link 
            to='/menu' 
            className='px-5 py-2 mt-3 rounded-full bg-black font-medium text-white inline-block'
          >
            Browse Our Menu
          </Link>

          </div>

          <div>
            <Slider />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
