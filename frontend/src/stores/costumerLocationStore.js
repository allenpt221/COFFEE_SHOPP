import { create } from "zustand";
import axios from "@/lib/axios";
import { UserStore } from "./userStore";

const storedStatuses = JSON.parse(localStorage.getItem("order-statuses") || "[]");

export const useCostumerStore = create((set, get) => ({
  location: [],
  order: [],
  statuses: storedStatuses,     // New: local status tracking
  loading: false,

  // Update local status for a specific row
  setStatus: (index, newStatus) => {
    const updated = [...get().statuses];
    updated[index] = newStatus;
    localStorage.setItem("order-statuses", JSON.stringify(updated));
    set({ statuses: updated });
  },

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

      const currentStatuses = JSON.parse(localStorage.getItem("order-statuses") || "[]");
      const defaultStatuses = new Array(res.data.order.length).fill("Processing");

      const statuses =
        currentStatuses.length === res.data.order.length
          ? currentStatuses
          : defaultStatuses;

      localStorage.setItem("order-statuses", JSON.stringify(statuses));

      set({
        location: res.data.location,
        order: res.data.order,
        statuses: statuses, // default statuses
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      set({ loading: false });
    }
  },
}));
