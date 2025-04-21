import mongoose from "mongoose";
import User from "../model/Employee.js"

export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users });
    } catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const CreateUser = async (req, res) => {
    const user = req.body

    if (!user.name || !user.email || !user.image) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" })
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser })
    } catch (error) {
        console.log(`Error in User Creation: ${error.message}`)
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const UpdateUser = async (req, res) => {
    const {id} = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "User not found or lnvalid" })
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
        res.status(200).json({ success: true, data: updatedUser })
    } catch (error) {
        console.log("Error during Updating User: ", error.message);
        res.status(500).json({ success: false, message: "Failed to update user" })
    }
}

export const DeleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User ID" });
    }

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "User has successfully deleted" })
    } catch (error) {
        res.status(404).json({ success: false, message: "User not found" })
    }
}