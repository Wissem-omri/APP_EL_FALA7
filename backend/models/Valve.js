import mongoose from "mongoose";
const valveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, enum: ["on", "off"], default: "off" },
  location: String,
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
});
export default mongoose.model("Valve", valveSchema);