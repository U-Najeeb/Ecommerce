import mongoose from "mongoose"

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL!)
        console.log("Connected to database")   
    } catch (error) {
        console.log("Something went wrong while connecting the database")
    }
}

export default connectToDb