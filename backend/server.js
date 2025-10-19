import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
//./config/db.js
import authRoutes from "./routes/authRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";
import valveRoutes from "./routes/valveRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/valves", valveRoutes);
app.listen(5000, () => console.log("🚀 Server running on port 5000"));