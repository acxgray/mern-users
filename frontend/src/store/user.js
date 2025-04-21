import { useState } from "react";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  createUser: async (newUser) => {
    if (!newUser.name || !newUser.email || !newUser.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch("/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    set((state) => ({ users: [...state.users, data.data] }));
    return { success: true, message: "User has been created" };
  },

  // Fetch User
  fetchUsers: async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    set({ users: data.data });
  },

  // Delete Product
  deleteUser: async (pid) => {
    const res = await fetch(`/api/users/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      users: state?.users.filter((user) => user._id !== pid),
    }));
		return { success: true, message: data.message }
  },

	// Update
	updateUser: async (pid, updatedUser) => {
		const res = await fetch(`/api/users/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUser)
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({
			users: state.users.map((user) => (user._id === pid ? data.data : user))
		}))

		return { success: true, message: data.message }



	}
}));
