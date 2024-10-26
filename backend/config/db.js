import mongoose from "mongoose";

const db = async()=>{
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URL);
        if (conn) {
            console.log(`mongoDB connected to ${conn.connection.host}`);
        } else {
            console.log('failed to connected to database');
        }
    } catch (error) {
        console.log(error.message);
    }
}

export default db;