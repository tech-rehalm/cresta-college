import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore"; // Import the Zustand store
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function UserManagementPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // State to store the values retrieved from the Zustand store
    const [users, setUsers] = useState([]);
    const [signupFn, setSignupFn] = useState(null);
    const [editUserFn, setEditUserFn] = useState(null);
    const [deleteUserFn, setDeleteUserFn] = useState(null);
    const [allUsersFn, setAllUsersFn] = useState(null);

    // Retrieve Zustand store values inside useEffect
    useEffect(() => {
        // Extract values from the store and set them in local state
        const {
            users: usersFromStore,
            allUsers: allUsersFromStore,
            signup: signupFromStore,
            editUser: editUserFromStore,
            deleteUser: deleteUserFromStore,
            allUsers
        } = useAuthStore.getState();

        // Set the local state for each of these values
        setSignupFn(() => signupFromStore);
        setEditUserFn(() => editUserFromStore);
        setDeleteUserFn(() => deleteUserFromStore);
        setAllUsersFn(() => allUsersFromStore);
        allUsers()
        // Fetch all users when the component mounts
        allUsersFromStore()
            .then((response) => {
                setUsers(response); // Update local users state if needed
            })
            .catch((error) => {
                toast.error("Failed to fetch users");
            });
            const fetchUsers = async () => {
              const res = await allUsers()
              setUsers(res.data);
            }
            fetchUsers()
    }, []);

    // Handle form inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submission for create or update
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editMode) {
            // Update user
            try {
                await editUserFn(editId, form);
                toast.success("User updated successfully!");
                setEditMode(false);
                setEditId(null);
                setForm({ name: "", email: "", password: "", role: "" });

                // Fetch updated users after editing
                allUsersFn();
            } catch (error) {
                toast.error("Failed to update user");
            }
        } else {
            // Create user
            try {
                await signupFn(form.name, form.email, form.password, form.role);
                toast.success("User created successfully!");
                setForm({ name: "", email: "", password: "", role: "" });

                // Fetch updated users after creation
                allUsersFn();
            } catch (error) {
                toast.error("Failed to create user");
            }
        }
    };

    // Handle editing a user
    const handleEdit = (user) => {
        setEditMode(true);
        setEditId(user._id);
        setForm({ name: user.name, email: user.email, role: user.role, password: "" });
    };

    // Handle deleting a user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUserFn(id);
                toast.success("User deleted successfully!");

                // Fetch updated users after deletion
                allUsersFn();
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <ToastContainer />
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">{editMode ? "Edit User" : "Create User"}</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter role"
                        />
                    </div>
                    {!editMode && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter password"
                            />
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            {editMode ? "Update User" : "Create User"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
                <h2 className="text-2xl font-bold mb-6">All Users</h2>
                {users && users.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}
