import mongoose from "mongoose";
const farmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
export default mongoose.model("Farm", farmSchema);
//farm