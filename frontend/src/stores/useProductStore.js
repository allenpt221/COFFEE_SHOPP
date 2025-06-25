import { create } from 'zustand';
import toast from "react-hot-toast";
import axios from '../lib/axios';


export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
    set({ loading: true });
    try {
        const response = await axios.get('/product');
        set({ products: response.data, loading: false });
    } catch (error) {
        console.error("Error fetching products:", error);
        set({ loading: false });
    }
},


    createProduct: async (productData) => {
        set({ loading: true });
        try {
            const response = await axios.post('/product', productData);
            set((prevState) => ({
                products: [...prevState.products, response.data],
                loading: false,
            }));
            toast.success("Product created successfully");
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Failed to create product");
            set({ loading: false });
        }
    },

    deleteProduct: async ( productId ) => {
        set({ loading: true});
        try {
             await axios.delete(`/product/${productId}`);


            set((prevState) => ({
                products: prevState.products.filter((product) => product._id !== productId),
                loading: false,
        }));

        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
            set({ loading: false });
        }
    },

}));