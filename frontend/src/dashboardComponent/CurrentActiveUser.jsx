import { UserStore } from '../stores/userStore';
import { TrendingDown, TrendingUp, Users } from 'lucide-react';

const CurrentActiveUser = () => {
  const { activeUserCount } = UserStore();



  const activeUserCountPercentage = activeUserCount / 100;

  return (
    <div className='flex flex-col border px-5 py-3 shadow rounded-md hover:shadow-lg transition-shadow duration-300 h-[7.5rem]'>
      <div className='flex justify-between items-start mb-1'>
        <div className='flex items-center gap-1 text-muted-foreground'>
          <h1 className='text-base font-medium'>Active Customers</h1>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-md flex gap-1 items-center 
            ${activeUserCountPercentage >= 0 
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
            }`}
        >
          {activeUserCountPercentage >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(activeUserCountPercentage).toFixed(2)}%
        </span>
      </div>

        <span className='text-2xl font-bold text-black'>
            {activeUserCount.toLocaleString()}
        </span>

        <span className='text-xs text-muted-foreground mt-1'>
        Updated {new Date().toLocaleDateString()}
        </span>

        <span className='text-xs font-medium text-green-600 mt-auto'>
            Users who logged in recently
        </span>
    </div>
  );
};

export default CurrentActiveUser;
