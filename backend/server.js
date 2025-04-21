import express from 'express';
import dotenv from 'dotenv';
import path from "path";

import { connectDB } from './config/db.js';
import userRoutes from './routes/UserRoutes.js';

const __dirname = path.resolve();

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000


app.use(express.json());


app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get(/(.*)/, (req, res) => {
	// app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT} `)
})