import { useCostumerStore } from '@/stores/costumerLocationStore';
import { TrendingDown, TrendingUp } from 'lucide-react';

const Revenue = () => {
  const { order } = useCostumerStore();

  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const thisYear = now.getFullYear();
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  const getRevenue = (orders) => {
    return orders
      .filter(order => order.status?.toLowerCase() === "complete")
      .reduce((total, orderItem) => {
        if (!orderItem.products) return total;
        const orderRevenue = orderItem.products.reduce((sum, product) => {
          return sum + (product.price || 0) * (product.quantity || 1);
        }, 0);
        return total + orderRevenue;
      }, 0);
  };

  const thisMonthOrders = order.filter(item => {
    const date = new Date(item.createdAt);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  });

  const lastMonthOrders = order.filter(item => {
    const date = new Date(item.createdAt);
    return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
  });

  const thisMonthRevenue = getRevenue(thisMonthOrders);
  const lastMonthRevenue = getRevenue(lastMonthOrders);

  const percentageChange = thisMonthRevenue / 100

  return (
    <div className='flex flex-col border px-5 py-3 shadow rounded-md hover:shadow-lg transition-shadow duration-300 h-[7.5rem]'>
      <div className='flex justify-between items-start mb-1'>
        <h1 className='text-base font-medium text-black/50'>Total revenue</h1>
        <span
          className={`text-xs font-medium px-2 rounded-md flex gap-2 items-center h-5
            ${percentageChange >= 0
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
            }`}
        >
          {percentageChange >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(percentageChange).toFixed(1)}%
        </span>
      </div>

      <span className='text-xl font-semibold'>{`₱${thisMonthRevenue.toFixed(2).toLocaleString()}`}</span>

      <span className='text-xs text-muted-foreground mt-1'>
        Last month: ₱{lastMonthRevenue.toLocaleString()}
      </span>

      <span className={`flex items-center gap-2 mt-auto text-sm font-medium ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {percentageChange >= 0 ? 'Trending up' : 'Trending down'} this month
        {percentageChange >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      </span>
    </div>
  );
};

export default Revenue;
