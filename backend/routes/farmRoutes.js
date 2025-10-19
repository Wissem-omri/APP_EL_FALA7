import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createFarm, getFarms, updateFarm, deleteFarm } from "../controllers/farmController.js";
const router = express.Router();
router.route("/").post(protect, createFarm).get(protect, getFarms);
router.route("/:id").put(protect, updateFarm).delete(protect, deleteFarm);
export default router;