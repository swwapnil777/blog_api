import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected Sucessfully");
  } catch (error) {
    console.log(error);
  }
};
export { connectDB };
