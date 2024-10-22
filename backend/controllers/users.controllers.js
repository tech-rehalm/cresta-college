import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// Signup a new user
export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if (!name || !email || !password || !role) {
            throw new Error("All fields are required");
        }
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        generateToken(res, user._id);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: null
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

export const create = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if (!name || !email || !password || !role) {
            throw new Error("All fields are required");
        }
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: null
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`
        });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(res, user._id);
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: null
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// User logout
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Sign out successful"
    });
};

// Check user authentication
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "User ID is required", success: false });
    }
    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "User ID is required", success: false });
    }
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a user by ID
export const editUserById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    if (!data) {
        return res.status(400).json({ message: "No data to update the user" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { ...data }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
