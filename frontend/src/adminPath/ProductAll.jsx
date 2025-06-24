import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";

const ProductAll = () => {

 const { products } = useProductStore();

 console.log("products", products);

  

  return (
    <div>
      {products?.map((product) => (
        <div key={product._id} className='border border-[#3131314d] rounded-sm p-4 mb-4'>
          <h2 className='text-lg font-semibold'>{product.name}</h2>
          <img src={product.image} alt="" />
          <p className='text-gray-600'>{product.description}</p>
          <p className='text-gray-800 font-bold'>${product.price}</p>
          <p className='text-gray-500'>Category: {product.category}</p>
          </div>
      ))}
    </div>
  )
}

export default ProductAll