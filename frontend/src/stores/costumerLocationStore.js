import { create } from "zustand";
import axios from "@/lib/axios";
import { UserStore } from "./userStore";



export const useCostumerStore = create((set) => ({
  location: [],
  loading: false,

  createLocation: async (locationData) => {
    set({ loading: true }); // Start loading
    try {

        const { user } = UserStore.getState(); 
        const fullData = {
            ...locationData,
            email: user?.email, 
        };

      const res = await axios.post('/orders/locations', fullData);
      set({
        location: res.data.location,
        loading: false, // Stop loading on success
      });
    } catch (error) {
      console.error("Error creating location:", error);
      set({ loading: false }); // Stop loading on error
    }
  },

}));