import  { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import axios from '../lib/axios';

const Slider = () => {

    const ITEM_WIDTH = 300;
    const GAP = 16;

    const x = useMotionValue(0);
    const containerRef = useRef(null);
    const [maxDrag, setMaxDrag] = useState(0);
    const [snapPoints, setSnapPoints] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);


    const [isLoading, setIsLoading] = useState(true);

    const [items, setItem] = useState([]);

  useEffect(() => {
    const fetchitem = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get('/product/random')
        setItem(res.data.product);
      } catch (error) {
        console.log('Error', error.message)
      } finally {
        setIsLoading(false)
      }
    } 
    fetchitem();
  },[])

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage(); // Initial check
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // will move the itemperpage after 5s
  useEffect(() => {
  if (!snapPoints.length || isLoading) return;

  const interval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % snapPoints.length;
    animate(x, snapPoints[nextIndex]);
    setCurrentIndex(nextIndex);
  }, 5000); // 5 seconds

  return () => clearInterval(interval); // Cleanup
}, [currentIndex, snapPoints, isLoading]);


useEffect(() => {
    if (items.length > 0) {
      const itemTotal = ITEM_WIDTH + GAP;
      const totalWidth = items.length * itemTotal - GAP;
      const viewWidth = itemsPerPage * itemTotal - GAP;
      const pages = Math.ceil(items.length / itemsPerPage);

      const newSnapPoints = [];
      for (let i = 0; i < pages; i++) {
        const offset = -i * itemTotal * itemsPerPage;
        newSnapPoints.push(Math.max(offset, viewWidth - totalWidth));
      }

      setSnapPoints(newSnapPoints);
      setMaxDrag(Math.min(0, viewWidth - totalWidth));
    }
  }, [items, itemsPerPage]);

  // Reset scroll on resize
  useEffect(() => {
    animate(x, 0);
    setCurrentIndex(0);
  }, [itemsPerPage]);

  const handleDragEnd = () => {
    const currentX = x.get();
    const closestIndex = snapPoints.reduce(
      (prevIndex, point, idx) =>
        Math.abs(point - currentX) < Math.abs(snapPoints[prevIndex] - currentX)
          ? idx
          : prevIndex,
      0
    );

    setCurrentIndex(closestIndex);
    animate(x, snapPoints[closestIndex]);
  };

  const CapitalFirstLetter = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <div className="flex flex-col items-center space-y-4">
          <div ref={containerRef} className="overflow-hidden lg:max-w-[940px] md:max-w-[620px] max-w-[300px]">
            {isLoading ? (
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[300px] shrink-0 shadow-lg border p-4 rounded animate-pulse"
                  >
                    <div className="w-full h-40 bg-gray-200 rounded mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2 w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
            <motion.div
              drag="x"
              style={{ x }}
              onDragEnd={handleDragEnd}
              dragConstraints={{ left: maxDrag, right: 0 }}
              className="flex gap-4 cursor-grab active:cursor-grabbing"
            >
              {items?.map((item, index) => (
                <div
                  key={index}
                  className="w-[300px] flex flex-col justify-between shrink-0 border shadow-lg p-4 rounded"
                >
                <img src={item.image} alt="" className="w-full h-auto max-h-40 object-cover rounded pointer-events-none" />
                  <p className='text-center mb-2'>{CapitalFirstLetter(item.name)}</p>
                  <p className='text-xs line-clamp-3'>{item.description}</p>
                  <p className='mt-5 text-right font-medium text-sm text-black/60'>₱{(item.price).toFixed(2)}</p>
                </div>
              ))}
            </motion.div>
            )}
          </div>

          {/* Pagination Dots */}
          <div className="flex space-x-2 mb-5">
        {snapPoints.map((point, index) => (
            <button
            key={index}
            onClick={() => {
                animate(x, point);
                setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${
                index === currentIndex ? 'bg-black/80' : 'bg-gray-300'
            }`}
            ></button>
        ))}
        </div>
    </div>
  )
}

export default Slider