import React, { useEffect, useState } from 'react'
import CreateMenu from '../adminPath/CreateMenu'
import ProductAll from '../adminPath/ProductAll'
import DashBoard from '../adminPath/DashBoard'
import { useProductStore } from '../stores/useProductStore'
import OrderCustomer from '@/adminPath/OrderCustomer'
import { useCostumerStore } from '@/stores/costumerLocationStore'
import { UserStore } from '@/stores/userStore'


const AdminDashboard = () => {

  const mapAdmin = [{
    name: 'Create Menu',
    path: 'createMenu',
  }, {
    name: 'Product All',
    path: 'productall',
  }, {
    name: 'Dashboard',
    path: 'dashboard',
  }, , {
    name: 'Costumer Order',
    path: 'costomerorder',
  }];

  const [path, setPath] = useState('createMenu');


  const { fetchProducts } = useProductStore();

  const { getLocation } = useCostumerStore();

  const { getActiveUsers, getNewUsers } = UserStore();

  
    useEffect(() => {
      fetchProducts();
      getLocation();
      getActiveUsers();
      getNewUsers();
    }, []);


  return (
    <div className="max-w-[1120px] m-auto p-4 ">
      <div className='flex flex-col justify-center items-center gap-2 '>
        <h1 className='text-2xl font-medium'>Admin Dashboard</h1>

        <div className='grid sm:grid-cols-4 gap-2 grid-cols-2'> 
          {mapAdmin.map((item, index) => (
            <button
              key={index}
              onClick={() => setPath(item.path)}
              className='bg-[#000] font-medium text-sm sm:text-md text-white sm:px-4 py-1 px-2 rounded hover:bg-[#0000008e] cursor-pointer'
            >
              {item.name}
            </button>
          ))}
        </div>
 
      </div>
          {path === 'createMenu' && <CreateMenu />}
          {path === 'productall' && <ProductAll />}
          {path === 'dashboard' && <DashBoard  setPath={setPath}/>}
          {path === 'costomerorder' && <OrderCustomer />}
    </div>
  )
}

export default AdminDashboard