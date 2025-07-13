import { create } from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';
import { useCostumerStore } from './costumerLocationStore';
import { useProductStore } from './useProductStore';


export const useCartStore = create((set, get) => ({
    cart:[],
    total: 0,
    subtotal: 0,
    order: null,

    getCartItems: async () => {
		try {
			const res = await axios.get("/cartproduct");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

    calculateTotals: () => {
    const { cart } = get();
    const subtotal = cart.reduce((sum, item) => {
        const hasDiscount = item.discounted === 'Discounted';
        const discountedPrice = hasDiscount
            ? item.price * 0.75  // Apply 25% off
            : item.price;
        return sum + discountedPrice * item.quantity;
        }, 0);


    const shipping = cart.length === 0 ? 0 : 25.57;
    const taxRate = 0.012;
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shipping;

    set({ subtotal, total, tax, shipping });
},


    orderto: async (product) => {
        try {
        await axios.post('/cartproduct', { productId: product._id });
            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id);
                const newCart = existingItem
                    ? prevState.cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                    : [...prevState.cart, { ...product, quantity: 1 }];
                return { cart: newCart };
            });

            get().calculateTotals();
        } catch (error) {
            console.error("Add to cart failed:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    checkoutSuccess: async() => {
        set({ cart: [] });
    },

    addToCart: async (product) => {
        try {
            await axios.post('/cartproduct', { productId: product._id });
            toast.dismiss();
            toast.success("Product added to cart");

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id);
                const newCart = existingItem
                    ? prevState.cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                    : [...prevState.cart, { ...product, quantity: 1 }];
                return { cart: newCart };
            });

            get().calculateTotals();
        } catch (error) {
            console.error("Add to cart failed:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    updateQuantity: async (productId, quantity) => {

            if(quantity === 0){
                get().calculateTotals();
                return;
            }

            await axios.put(`cartproduct/${productId}`, {quantity});
            set((prevState) => ({
                cart:prevState.cart.map((item) => (item._id === productId) ? {...item, quantity} : item),
            }));

            get().calculateTotals();
    },

    removeFromCart: async(productId) => {
        await axios.delete(`/cartproduct`, { data: { productId } });
        set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();

    },

    submitOrder: async (paymentMethod, formCard) => {
  try {
    set({ loading: true, error: '' });

    const cart = get().cart;

    const checkproduct = useProductStore.getState().products;

    const products = cart.map(item => {
      const matched = checkproduct.find(p => p._id === item._id);
      const isDiscounted = matched?.discounted === "Discounted";

      return {
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: isDiscounted ? item.price * 0.75 : item.price,
        category: item.category,
      };
    });

    const subtotal = products.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const shipping = 25.57;
    const taxRate = 0.012;
    const tax = subtotal * taxRate;
    const totalAmount = subtotal + tax + shipping;

    console.log("Submitting order with:", { products, totalAmount });

    const res = await axios.post('/orders', {
      products,
      totalAmount,
      paymentMethod,
      cardInfo: formCard,
    });

    set({
      order: res.data.order,
      cart: [],
      loading: false,
    });

    useCostumerStore.getState().orderProduct();

    toast.success("Order successfully placed!");
  } catch (error) {
    console.error("Submit order failed:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Order submission failed");
    set({ loading: false });
  }
}


}));