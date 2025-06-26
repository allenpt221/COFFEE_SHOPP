import { PlusCircle, Upload } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";


const CreateMenu = () => {

  const categories = ["hotdrinks", "iceddrinks", "shoes", "Blended", "noncoffee", "desserts"];

  
  const [newProduct, setNewProduct] = useState({
    name: "",
		description: "",
		price: "",
		image: "",
		category: "",
	});
  
  const { createProduct, loading } = useProductStore();
  
  const handleSubmit = async (e) => {
		e.preventDefault();


		try {
      await createProduct(newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: ""   
      }) 
		} catch {
			console.log("error creating a product");
		}
	};

  const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); 
		}
	};

  return (
    <div>
      <form onSubmit={handleSubmit} 
      className='space-y-2'>
        <label>Product Name:</label>
        <input 
        type="text" 
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder='Enter product name'
        className='border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full'/>
        <label>Price:</label>
        <input 
        type="number" 
        id='price'
        placeholder='Enter product price'
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        min="0"
        className='border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full'/>
        <label>Description:</label>
        <textarea 
        type="text" 
        rows="3"
        maxlength={200}
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        placeholder='Enter product description (Max 250 characters...)'
        className='border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full'/>
        <label>Category</label>
        <select 
        name="category" 
        id="category"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        className='border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full'
        required
        >
          <option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
        </select>
        <div className='mt-1 flex items-center'>
					<input 
          type='file' 
          id='image' 
          className='sr-only' 
          accept='image/*' 
          required
          onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-[#000] py-2 px-3 border border-[#000] rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
				</div>
        <button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-black hover:bg-[#00000080] cursor-pointer
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
      </form>
    </div>
  )
}

export default CreateMenu