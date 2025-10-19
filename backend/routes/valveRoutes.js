import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createValve, getValvesByFarm, updateValve, deleteValve } from "../controllers/valveController.js";
const router = express.Router();
router.route("/:farmId").get(protect, getValvesByFarm).post(protect, createValve);
router.route("/update/:id").put(protect, updateValve).delete(protect, deleteValve);
export default router;