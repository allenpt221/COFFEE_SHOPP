import { TrendingDown, TrendingUp } from 'lucide-react';
import { UserStore } from '@/stores/userStore';

const TotalCostumer = () => {

    const { activeUser, activeUserCount, totalCostumer, newUserCount } = UserStore();

    const totalCostumerPercentage = totalCostumer / 100;

  return (
    <div className='flex flex-col border px-5 py-3 shadow rounded-md hover:shadow-lg transition-shadow duration-300 h-[7.5rem]'>
        <div className='flex justify-between items-start mb-1'>
        <h1 className='text-base font-medium text-muted-foreground'>Total Customers</h1>
        <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-md flex gap-1 items-center 
            ${totalCostumerPercentage >= 0 
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
        >
            {totalCostumerPercentage >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(totalCostumerPercentage).toFixed(2)}%
        </span>
        </div>
        <span className='text-2xl font-bold text-black'>{totalCostumer.toLocaleString()}</span>
        <div className='flex items-center text-xs gap-2'>
        <span className='text-black/50'>New costumer this month:</span>
        <span className='font-medium text-black/50'>{newUserCount.toLocaleString()}</span>
        </div>
        <div className={`flex items-center gap-2 mt-auto text-xs font-medium 
        ${totalCostumer >= 1 ? 'text-green-600' : 'text-red-600'}`}>
        {totalCostumer >= 1 ? 'Growing costumer base this period' : 'Costumer drop this period'}
        {totalCostumer >= 1 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        </div>
    </div>
  )
}

export default TotalCostumer