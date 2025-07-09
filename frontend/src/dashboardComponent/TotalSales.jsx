import { useCostumerStore } from '@/stores/costumerLocationStore';
import { MoveRight, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TotalSales = ({ setPath }) => {
  const { order } = useCostumerStore();

  const totalSales = order.reduce((total, item) => total + item.totalAmount, 0);
  const totalPercentage = totalSales / 100;

  return (
    <div className='flex flex-col border px-5 py-3 shadow rounded-md hover:shadow-lg transition-shadow duration-300 h-[7.5rem]'>
      <div className='flex justify-between items-start mb-1'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <Users size={16} />
          <h1 className='text-base font-medium'>Total Sales</h1>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-md flex gap-1 items-center 
            ${totalPercentage >= 0 
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
            }`}
        >
          {totalPercentage >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(totalPercentage).toFixed(2)}%
        </span>
      </div>

      <span className='text-2xl font-bold text-black'>
        ₱{Number(totalSales).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>

      <span className='text-xs text-muted-foreground mt-1'>
        {order.length} total orders · Updated
      </span>

      <button 
      onClick={() => setPath('costomerorder')} className='mt-auto text-left text-xs font-medium text-green-600 hover:underline cursor-pointer flex items-center gap-1'>
        Recent sales activity <MoveRight size={13} />
      </button>
    </div>
  );
};

export default TotalSales;
