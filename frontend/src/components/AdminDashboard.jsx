import React, { useEffect, useState } from 'react'
import CreateMenu from '../adminPath/CreateMenu'
import ProductAll from '../adminPath/ProductAll'
import Analysis from '../adminPath/Analysis'
import { useProductStore } from '../stores/useProductStore'


const AdminDashboard = () => {

  const mapAdmin = [{
    name: 'Create Menu',
    path: 'createMenu',
  }, {
    name: 'Product All',
    path: 'productall',
  }, {
    name: 'Analysis',
    path: 'analysis',
  }];

  const [path, setPath] = useState('createMenu');


  const { fetchProducts } = useProductStore();
  
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);


  return (
    <div className="max-w-[1120px] m-auto p-4 ">
      <div className='flex flex-col justify-center items-center gap-2 '>
        <h1 className='text-2xl font-medium'>Admin Dashboard</h1>

        <div className='space-x-5'> 
          {mapAdmin.map((item, index) => (
            <button
              key={index}
              onClick={() => setPath(item.path)}
              className='bg-[#000] font-medium text-sm sm:text-md text-white sm:px-4 py-1 px-1 rounded hover:bg-[#0000008e] cursor-pointer'
            >
              {item.name}
            </button>
          ))}
        </div>
 
      </div>
          {path === 'createMenu' && <CreateMenu />}
          {path === 'productall' && <ProductAll />}
          {path === 'analysis' && <Analysis />}
    </div>
  )
}

export default AdminDashboard