import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURI)

        console.log(`MongoDB Connection Successfully established at ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}