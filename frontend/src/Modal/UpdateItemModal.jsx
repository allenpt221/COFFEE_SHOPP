import { Upload, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const categories = ["hotdrinks", "iceddrinks", "Blended", "noncoffee", "desserts"];
const discountedvalue = ["Not Discounted", "Discounted"];

const UpdateItemModal = ({ isOpen, isClose, onUpdateProduct, updatedProjectData }) => {
  if (!isOpen) return null;

  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    category: "",
    discounted: "",
    image: "",
  });

  useEffect(() => {
    if (updatedProjectData) {
      setUpdateProduct({
        id: updatedProjectData._id || "",
        name: updatedProjectData.name || "",
        price: updatedProjectData.price || "",
        description: updatedProjectData.description || "",
        category: updatedProjectData.category || "",
        discounted: updatedProjectData.discounted || "Not Discounted",
        image: updatedProjectData.image || "",
      });
    }
  }, [updatedProjectData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProduct(updateProduct); // Call the parent update function
    isClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">Update Product</h1>
          <button onClick={isClose} className="cursor-pointer">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <label>Product Name:</label>
          <input
            type="text"
            value={updateProduct.name}
            onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
            placeholder="Enter product name"
            className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full"
          />

          <label>Price:</label>
          <input
            type="number"
            value={updateProduct.price}
            onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
            className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full"
          />

          <label>Description:</label>
          <textarea
            rows="3"
            maxLength={200}
            value={updateProduct.description}
            onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
            className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full"
          />

          <label>Category</label>
          <select
            value={updateProduct.category}
            onChange={(e) => setUpdateProduct({ ...updateProduct, category: e.target.value })}
            className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label>Discounted</label>
          <select
            value={updateProduct.discounted}
            onChange={(e) => setUpdateProduct({ ...updateProduct, discounted: e.target.value })}
            className="border border-[#3131314d] rounded-sm focus:border-[#00000052] focus:outline-none px-2 py-1 w-full"
            required
          >
            {discountedvalue.map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>

          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="update-image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="update-image"
              className="cursor-pointer bg-[#000] py-2 px-3 border border-[#000] rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {updateProduct.image && <span className="ml-3 text-sm text-gray-400">Image uploaded</span>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
            shadow-sm text-sm font-medium text-white bg-black hover:bg-[#00000080] cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItemModal;
