import { X } from 'lucide-react';

const UpdateItemModal = ({ isOpen, isClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className='flex justify-between items-center'>
        <h1 className="text-xl font-semibold">Update Product</h1>
        <button
          onClick={isClose}
          className=''
        >
          <X />
        </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateItemModal;
