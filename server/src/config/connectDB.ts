import mongoose from "mongoose";
export const ConnectDb = async () => {
    if (!process.env.LOCAL_MONGO_URL) {
        throw new Error("LOCAL_MONGO_URL is not defined");
    }

    try {
        await mongoose.connect(process.env.LOCAL_MONGO_URL);

        console.log("MongoDB connected");
    } catch (error) {
        console.log("Connect", error);
        process.exit(1);
    }
};
