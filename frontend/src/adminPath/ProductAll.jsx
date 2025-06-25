import { Ellipsis } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProductAll = () => {
  const { products, deleteProduct } = useProductStore();
  const [openAction, setOpenAction] = useState(null);

  
  function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  const handleActionClick = (productId) => {
    setOpenAction((prev) => (prev === productId ? null : productId));
  };

  return (
    <div className="shadow-lg rounded-lg overflow-x-auto max-w-4xl mx-auto relative">
      <table className="min-w-full font-sans divide-y overflow-x-scroll divide-gray-200 rounded-md table-auto ">
        <thead>
          <tr className="border-b border-[rgba(70,70,70,0.19)] sticky top-0 z-10 bg-white ">
            <th className="text-left p-4">Product Image</th>
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className="border-b border-[#3332323b] ">
              <td className="px-2 py-2">
                <img
                  src={product.image}
                  alt="Error fetching Image"
                  className="w-[10rem] h-[4rem] object-cover"
                />
              </td>
              <td className="px-2 py-2 font-medium sm:text-[17px] text-xs">
                {capitalizeWords(product.name)}
              </td>
              <td className="px-2 py-2 font-medium sm:text-[17px] text-xs">
                {product.price}
              </td>
              <td className="px-2 py-2 font-medium sm:text-[17px] text-xs">
                {product.category}
              </td>
              <td className="px-5 py-2 font-medium sm:text-[17px] text-xs">
                <Popover open={openAction === product._id} onOpenChange={(open) => {
                  setOpenAction(open ? product._id : null);
                }}>
                  <PopoverTrigger asChild>
                    <button className="cursor-pointer" onClick={() => handleActionClick(product._id)}>
                      <Ellipsis size={15} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="flex flex-col gap-2">
                      <button className="text-red-500  text-left cursor-pointer" 
                        onClick={() => {
                          deleteProduct(product._id);
                          setOpenAction(null)
                        }}
                        >
                        Delete
                      </button>
                      <button className=" text-left ">
                        Update
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAll;
