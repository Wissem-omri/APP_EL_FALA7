import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://wissem:wissem123@cluster0.5knpfgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};
export default connectDB;