import { create } from "zustand";
import axios from '../lib/axios'

import { toast } from "react-hot-toast";


export const UserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    
    activeUser: null,
    activeUserCount: 0,

    newUser: null,
    newUserCount: 0,
    totalCostumer: null,

    dataUser: null,

    signup: async ({name, email, password, confirmPassword}) => {
        set({ loading: true});

        if(password !== confirmPassword) {
            set({ loading: false });
            toast.error("Passwords do not match");
            return
        }
        try {
            const res = await axios.post("/auth/signup", { name, email, password });
            set({user: res.data, loading: false});
            toast.success("Signup successful!");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during signup");
        }
    },

    login: async (email, password) => {
        set({ loading: true });
        try {
            toast.dismiss();
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error("Invalid credentials. Please try again.");
        }
    },

    updateUserStatus: (userId, newStatus) => {
        const { dataUser, activeUser, activeUserCount } = get();

        // Update dataUser and activeUser arrays
        const updatedDataUser = dataUser?.map(u =>
            u._id === userId ? { ...u, status: newStatus } : u
        );

        const updatedActiveUser = activeUser?.map(u =>
            u._id === userId ? { ...u, status: newStatus } : u
        );

        // Adjust active user count
        let newActiveUserCount = activeUserCount;

        if (newStatus === "offline") {
            newActiveUserCount = Math.max(0, activeUserCount - 1);
        } else if (newStatus === "online") {
            newActiveUserCount = activeUserCount + 1;
        }

        set({
            dataUser: updatedDataUser,
            activeUser: updatedActiveUser,
            activeUserCount: newActiveUserCount,
        });
    },


        logout: async () => {
        try {
            const { user, updateUserStatus } = get(); 
            await axios.post("/auth/logout");

            set({ user: null });

            if (user?._id) {
            updateUserStatus(user._id, "offline"); 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
        },


    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            console.log(error.message);
			set({ checkingAuth: false, user: null });
        }
    },

    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},

    getActiveUsers: async() => {
        try {
            const res = await axios.get('/auth/active-users');

            set({activeUser: res.data.activeUsers, 
                activeUserCount: res.data.activeUserCount, 
                totalCostumer: res.data.totalUsers,
                dataUser: res.data.allUsers});
        } catch (error) {
            console.log(error.response?.data.message || "error fetching the active user")
        }
    },
    getNewUsers: async() => {
        try {
            const res = await axios.get('/auth/new-users');

            set({newUserCount: res.data.newUserCount, newUser: res.data.users })
            

        } catch (error) {
            console.log(error.response?.data.message || "error fetching the new user")
            
        }
    }
}));