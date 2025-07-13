import { create } from "zustand";
import axios from "@/lib/axios";
import { UserStore } from "./userStore";

export const useCostumerStore = create((set, get) => ({
  location: [],
  order: [],
  loading: false,
  backUpOrders: [],

  // Create new location, then refresh data
  createLocation: async (locationData) => {
    set({ loading: true });
    try {
      const { user } = UserStore.getState();
      const fullData = {
        ...locationData,
        email: user?.email,
      };

      // Send to backend
      await axios.post("/orders/locations", fullData);

      // ✅ Refresh frontend state after creating new data
      await get().getLocation();

      set({ loading: false });
    } catch (error) {
      console.error("Error creating location:", error);
      set({ loading: false });
    }
  },

  // Fetch data and initialize statuses
  getLocation: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/orders/location");

      set({
        location: res.data.location,
        order: res.data.order,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      set({ loading: false });
    }
  },
  backUpOrderProduct: async () => {
    try {
      const response = await axios.get('orders/backuporders');
      set({backUpOrders: response.data.backupOrder});

    } catch (error) {
        console.error("Error fetching backup order product:", error);
    }

  },
    updateStatus: async ({ id, status }) => {
        try {
            await axios.put(`/orders/${id}`, { status }); // Only send status
            set((state) => ({
              order: state.order.map((order) =>
                order._id === id ? { ...order, status } : order
              ),
              backUpOrders: state.backUpOrders.map((order) =>
                order.originalOrderId === id ? { ...order, status } : order
              ),
            }));

        } catch (error) {
            console.error("Error updating status:", error);
        }
    },

    // Get all orders and location base on userID
    orderProduct: async () => {
      try {
          const res = await axios.get('orders/getorder');

          set({order: res.data.productUser, location: res.data.locationCustomer});

      } catch (error) {
          console.error("Error fetching order product:", error);
          
      }
    }, 

    deleteProduct: async ({ id }) => {
      try {
        await axios.delete(`orders/${id}`);

        set((prevState) => ({
          order: prevState.order.filter((orderId) => orderId._id !== id)
        }));

      } catch (error) {
          console.error("Error deleting order product:", error);
        
      }
    }
    
}));
